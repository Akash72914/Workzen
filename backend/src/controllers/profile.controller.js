export const profileController = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
