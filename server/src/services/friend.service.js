import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";

export const sendFriendRequest = async (senderId, recipientId) => {};

export const acceptFriendRequest = async (requestId, currentUserId) => {};

export const getFriendRequests = async (userId) => {};

export const getOutgoingFriendRequests = async (userId) => {};

export const getMyFriends = async (userId) => {};

export const getRecommendedUsers = async (currentUser) => {};

export const blockUser = async (myId, targetId) => {};

export const unblockUser = async (myId, targetId) => {};

export const getBlockedUsers = async (userId) => {};