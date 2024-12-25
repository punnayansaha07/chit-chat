import User from "../models/user.models.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    // Ensure req.user is populated by authentication middleware
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const loggedInUserId = req.user._id;
    // Fetch users excluding the logged-in user and excluding password field
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSideBar:", error.message); // More descriptive logging
    res.status(500).json({ error: "Internal Server Error" });
  }
};
