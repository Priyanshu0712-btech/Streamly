import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import * as friendService from "../services/friend.service.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const friendRequest = await friendService.sendFriendRequest(
      req.user.id,
      req.params.id,
    );

    res.status(201).json({
      success: true,
      friendRequest,
    });
  } catch (error) {
    console.error("Error in sendFriendRequest:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    await friendService.acceptFriendRequest(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Friend request accepted",
    });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export async function rejectFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    // Only the recipient can reject
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    friendRequest.status = "rejected";
    await friendRequest.save();

    res.status(200).json({
      success: true,
      message: "Friend request rejected",
    });
  } catch (error) {
    console.error("Reject Friend Request:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export const getFriendRequests = async (req, res) => {
  try {
    const requests = await friendService.getFriendRequests(req.user.id);

    res.status(200).json({
      success: true,
      ...requests,
    });
  } catch (error) {
    console.error("Error in getFriendRequests:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const requests = await friendService.getOutgoingFriendRequests(req.user.id);

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const friends = await friendService.getMyFriends(req.user.id);

    res.status(200).json(friends);
  } catch (error) {
    console.error("Error in getMyFriends:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getRecommendedUsers = async (req, res) => {
  try {
    const users = await friendService.getRecommendedUsers(req.user);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const blockUser = async (req, res) => {
  try {
    const result = await friendService.blockUser(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error in blockUser:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const result = await friendService.unblockUser(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error in unblockUser:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await friendService.getBlockedUsers(req.user.id);

    res.status(200).json({
      success: true,
      blockedUsers,
    });
  } catch (error) {
    console.error("Error in getBlockedUsers:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
