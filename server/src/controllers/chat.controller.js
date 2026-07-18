import { generateStreamToken, upsertStreamUser } from "../services/stream.service.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = generateStreamToken(req.user._id);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error in getStreamToken:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const syncStreamUser = async (req, res) => {
  try {
    await upsertStreamUser(req.user);

    res.status(200).json({
      success: true,
      message: "User synced successfully",
    });
  } catch (error) {
    console.error("Error syncing Stream user:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};