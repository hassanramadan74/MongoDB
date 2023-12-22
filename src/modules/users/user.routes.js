import { checkEmailExist } from "../../middleware/checkEmailExist.js";
import { hashPassword } from "../../middleware/hashPassword.js";
import { deleteUser, getAllProductsWithOwners, getAllUsers, searchUsers, searchUsersAge, signIn, signUp, updateUser } from "./user.controller.js";
import express from 'express'
const userRouter = express.Router()

userRouter.post("/signUp", checkEmailExist,hashPassword,signUp);
userRouter.post("/signIn", signIn);
userRouter.get("/users", getAllUsers);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);
userRouter.get('/searchUsers', searchUsers);
userRouter.get('/searchUsersAge', searchUsersAge);
userRouter.get('/getUsersProducts',getAllProductsWithOwners)


export default userRouter