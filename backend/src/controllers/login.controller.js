import { loginUser } from "../services/auth.service";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser({
      email,
      password,
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
