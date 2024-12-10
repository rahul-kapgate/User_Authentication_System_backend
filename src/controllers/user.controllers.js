import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessToekens = async (userId) => {
  try {
    const user = await User.findById(userId);
    // console.log(user)
    const accessToken = user.generateAccessToken();

    await user.save();

    return { accessToken };
  } catch (error) {
    //  console.log(error);

    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //steps to register User ( Alog )

  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // create user object - create entry in db
  // remove password field from response
  // check for user creation
  // return res

  const { fullname, username, email, password } = req.body;

  if (!fullname) throw new ApiError(400, "Fullname is required");
  if (!username) throw new ApiError(400, "Username is required");
  if (!password) throw new ApiError(400, "Password is required");
  if (!email) throw new ApiError(400, "Email is required");

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "Username with username or email already existed !! "
    );
  }

  const user = await User.create({
    fullname,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) throw new ApiError(500, "Error while registing user");
  else console.log(`${user.username} is created`);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user register successfully "));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access Token

  const { username, email, password } = req.body;

  if (!(username || password)) {
    throw new ApiError(404, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(400, "User Not found");

  // console.log(user._id)

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken } = await generateAccessToekens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log(` ${username} User Logged in Successfully`);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User Logged in Successfully !!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid user"));
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log(`${req.user.username} is logout`);

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "user logged out"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    throw new ApiError(
      400,
      "Username, old password, and new password are required"
    );
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User with this username does not exist");
  }

  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isOldPasswordCorrect) {
    throw new ApiError(401, "The old password is incorrect");
  }

  user.password = newPassword;

  await user.save();

  console.log(`password reset`);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password has been reset successfully"));
});

export { registerUser, loginUser, logoutUser, resetPassword };
