import streamClient from "../config/stream.js";

export const upsertStreamUser = async (user) => {
  try {
    const streamUser = {
      id: user._id.toString(),
      name: user.fullName,
      image: user.profilePic,
    };

    await streamClient.upsertUsers([streamUser]);

    return streamUser;
  } catch (error) {
    console.error("Error syncing Stream user:", error);
    throw error;
  }
};

export const generateStreamToken = (userId) => {
  try {
    return streamClient.createToken(userId.toString());
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};
