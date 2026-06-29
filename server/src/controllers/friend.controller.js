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

export const getRecommendedUsers = async (req, res) => {};

export const blockUser = async (req, res) => {};

export const unblockUser = async (req, res) => {};

export const getBlockedUsers = async (req, res) => {};
