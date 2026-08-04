import express from "express";
import { create, deleteUser, getAllUser, getUserById, upateUser } from "../Controllers/user.Controller.js";


const userRoute = express.Router();
// post user
userRoute.post("/user", create)
// get all users
userRoute.get("/users",  getAllUser)
// get specific user
userRoute.get("/user/:id", getUserById)
// update user data
userRoute.put("/update/user/:id", upateUser)
// delete user
userRoute.delete("/delete/user/:id", deleteUser)

export default userRoute;