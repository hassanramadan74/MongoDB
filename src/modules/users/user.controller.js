import { productModel } from "../../../databases/models/product.model.js";
import { userModel } from "../../../databases/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { sendMail } from "../../Emails/sendEmail.js";

//signUp

const signUp = async (req, res) => {
  await userModel.create(req.body);
  sendMail()
  res.json({ message: "user successfully registered" });
};

//signIn
const signIn = async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({
      message: "Authentication failed! wrong credentials",
    });
  } else {
    const token = jwt.sign(
      { userID: user._id, role: user.role },"myNameIsHassan")
    return res.json({ message: "success" , token});
  }
};

//update user
const updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).send("The user with the given ID was not found.");
  } else {
    res.json({ message: "user updated successfully", updateUser });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.json({ message: "User deleted successfully" });
};

// find user that name contain X and their age lessThan Y
const searchUsers = async (req, res) => {
  const { name, maxAge } = req.query;
  const nameRegex = new RegExp(name, "i");
  const users = await userModel.find({
    username: { $regex: nameRegex },
    age: { $lt: maxAge },
  });
  if (!users) {
    return res.status(404).send("No Users Found");
  } else {
    return res.json({ users });
  }
};

//get user between two ages
const searchUsersAge = async (req, res) => {
  const { minAge, maxAge } = req.query;
  const users = await userModel.find({ age: { $gte: minAge, $lte: maxAge } });
  if (!users) {
    return res.send(`No User Found Between ${minAge} And ${maxAge}`);
  } else {
    return res.json({ users });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({ users });
};

const getAllProductsWithOwners = async (req, res) => {
  const allProductsWithOwners = await productModel.find().populate("userId");
  const usersWithProducts = {};
  allProductsWithOwners.forEach((product) => {
    const userId = product.userId._id;
    if (!usersWithProducts[userId]) {
      usersWithProducts[userId] = {
        user: product.userId,
        products: [],
      };
    }
    usersWithProducts[userId].products.push(product);
  });
  return res.json({
    message: "All products with owners retrieved successfully",
    usersWithProducts: Object.values(usersWithProducts),
  });
};

export {
  signUp,
  signIn,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers,
  searchUsersAge,
  getAllProductsWithOwners,
};
