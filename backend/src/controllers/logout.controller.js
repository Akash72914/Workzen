export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
