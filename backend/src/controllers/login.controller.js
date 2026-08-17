import { loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser({
      email,
      password,
    });

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.log(error);

    if (error.message === "Invalid email or password.") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
