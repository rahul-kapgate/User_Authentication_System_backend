import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    console.log("token not found")
    throw new ApiError(401, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user; 
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export { authenticate };
