import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    const { userId } = tokenDecode;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Authentication error:", error);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};
