import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import generateAvatar from "../utils/generateAvatar.js";
import { upsertStreamUser } from "../services/stream.service.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Validation
    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Generate default avatar
    const randomAvatar = generateAvatar(fullName);

    // Create user
    const newUser = await User.create({
      email: normalizedEmail,
      fullName: fullName.trim(),
      password,
      profilePic: randomAvatar,
    });

    // Create Stream user
    try {
      await upsertStreamUser(newUser);

      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (streamError) {
      console.error("Failed to create Stream user:", streamError);
    }

    // Generate JWT
    const token = generateToken(newUser._id);

    // Set Cookie
    const isProduction = process.env.NODE_ENV === "production";

    setAuthCookie(res, token);

    // Response
    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        bio: newUser.bio,
        nativeLanguage: newUser.nativeLanguage,
        location: newUser.location,
        isOnboarded: newUser.isOnboarded,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.matchPassword(password);

    try {
      await upsertStreamUser(user);
    } catch (error) {
      console.log("Failed to sync Stream user:", error.message);
    }

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    const isProduction = process.env.NODE_ENV === "production";

    setAuthCookie(res, token);

    user.password = undefined;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export async function onboard(req, res) {
  try {
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, location } = req.body;

    if (
      !fullName?.trim() ||
      !bio?.trim() ||
      !nativeLanguage?.trim() ||
      !location?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updateData = {
      fullName,
      bio,
      nativeLanguage,
      location,
      isOnboarded: true,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    try {
      await upsertStreamUser(updatedUser);

      console.log(
        `Stream user updated after onboarding for ${updatedUser.fullName}`,
      );
    } catch (streamError) {
      console.log(
        "Error updating Stream user during onboarding:",
        streamError.message,
      );
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
