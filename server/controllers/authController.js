import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authController = async (req, res) => {
  try {
    const { name, email, address, phone, password } = req.body;
    if (!name) {
      return res.send({ Error: "name is required" });
    }
    if (!email) {
      return res.send({ Error: "email is required" });
    }
    if (!address) {
      return res.send({ Error: "address is required" });
    }
    if (!phone) {
      return res.send({ Error: "phone is required" });
    }
    if (!password) {
      return res.send({ Error: "password is required" });
    }

    //existing user

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already exits please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await new User({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({
      success: true,
      Message: "new USer Created",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//post login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.jwt_passcode, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfull",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const adminController = (req, res) => {
  res.send("jwt verified");
};
