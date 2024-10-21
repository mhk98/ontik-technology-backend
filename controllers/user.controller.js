const db = require("../../models"); // Assuming your User model is here
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { generateToken } = require('../../utils/jwt_token');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = {
        name,
        email,
        password,
    };

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(409).send("User already exists");
    }

    const user = new User(data);
    await user.save();
    
    res.status(200).send({
      status: "Success",
      message: "Successfully signed up",
      data: user,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      status: "fail",
      message: "Error during signup",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.status(200).send({
      status: "Success",
      message: "Fetched all users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "No data found",
      error: error.message,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "No user found",
      });
    }

    res.status(200).send({
      status: "Success",
      message: "User information retrieved",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({
        status: "fail",
        message: "No user found",
      });
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully deleted user",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error deleting user",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both email and password.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user found with this email.",
      });
    }

    const isPasswordValid = bcrypt.compareSync(email, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "Incorrect password or email.",
      });
    }

    const accessToken = generateToken(user);

    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    };
    res.cookie("accessToken", accessToken, cookieOptions);

    res.status(200).json({
      status: "success",
      message: "Logged in successfully.",
      data: { accessToken, user },
    });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({
      status: "fail",
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    let verifiedToken = null;

    try {
      verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return res.status(401).send("Invalid refresh token");
    }

    const { Email, role } = verifiedToken;

    const isUserExist = await User.findOne({ Email });
    if (!isUserExist) {
      return res.status(404).send("User does not exist");
    }

    const newAccessToken = jwt.sign(
      { Email, role },
      process.env.REFRESH_SECRET,
      { expiresIn: "365d" }
    );

    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).send({
      status: "Success",
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { Password, Email } = req.body;

    if (!Email) {
      return res.status(400).send("Email not found");
    }

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.Password = bcrypt.hashSync(Password, 10);
    await user.save();

    res.status(200).send({
      status: "Success",
      message: "Password updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Failed to update password",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const user = await User.findByIdAndUpdate(id, data, { new: true });

    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "No user found",
      });
    }

    res.status(200).send({
      status: "Success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
