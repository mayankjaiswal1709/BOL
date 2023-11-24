const UserModel = require("../models/UserModelSignup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new Error("Required fields missing", 400);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists, please sign in", 401);
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashPass,
      name,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Successful",
      result: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Required fields missing", 400);
    }

    const requiredUser = await UserModel.findOne({ email });
    if (!requiredUser) {
      throw new Error("No user with this email exists, please sign up", 404);
    }

    const passwordMatch = await bcrypt.compare(password, requiredUser.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials", 401);
    }

    const token = jwt.sign({ id: requiredUser._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    res.json({
      message: "Successful Loggingin",
      result: {
        _id: requiredUser._id,
        email: requiredUser.email,
        name: requiredUser.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
