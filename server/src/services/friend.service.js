import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";

export const sendFriendRequest = async (senderId, recipientId) => {
  if (senderId === recipientId) {
    throw new Error("You can't send a friend request to yourself");
  }

  const recipient = await User.findById(recipientId);

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  const sender = await User.findById(senderId);

  if (!sender) {
    throw new Error("Sender not found");
  }

  if (recipient.blockedUsers.includes(senderId)) {
    throw new Error("You cannot interact with this user");
  }

  if (sender.blockedUsers.includes(recipientId)) {
    throw new Error("Unblock this user first");
  }

  if (recipient.friends.includes(senderId)) {
    throw new Error("You are already friends");
  }

  const existingRequest = await FriendRequest.findOne({
    $or: [
      {
        sender: senderId,
        recipient: recipientId,
      },
      {
        sender: recipientId,
        recipient: senderId,
      },
    ],
  });

  if (existingRequest) {
    throw new Error(
      "A friend request already exists between you and this user"
    );
  }

  const friendRequest = await FriendRequest.create({
    sender: senderId,
    recipient: recipientId,
  });

  return friendRequest;
};


export const acceptFriendRequest = async (requestId, currentUserId) => {};

export const getFriendRequests = async (userId) => {};

export const getOutgoingFriendRequests = async (userId) => {};

export const getMyFriends = async (userId) => {};

export const getRecommendedUsers = async (currentUser) => {};

export const blockUser = async (myId, targetId) => {};

export const unblockUser = async (myId, targetId) => {};

export const getBlockedUsers = async (userId) => {};
