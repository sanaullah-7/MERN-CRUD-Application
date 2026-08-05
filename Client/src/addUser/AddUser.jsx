import React, { useState } from "react";
import { StepBack } from 'lucide-react';
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../api";


export default function AddUser() {
  const users = {
    name: "",
    email:"",
    address:"",

  }
  const [user , setUser] = useState(users)
  const naviagte = useNavigate();

  const inputHandler = (e) => {
        const {name ,  value} = e.target;
           console.log(name ,  value)
        

        setUser({...user, [name]: value});
  };

  const sumbitForm = async(e)=>{
    e.preventDefault();
    await api.post("/api/user", user)
    .then((response)=>{
      // console.log("User Created Sucessfully")
      toast.success(response.data.message,{position:"top-left"})
      naviagte("/")
    })
    .catch((error) => {
  toast.error("User Already Exist",{position: "top-left",});
});}
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
         <Link to="/"
  className="flex items-center gap-2 px-4 py-2 mb-5 bg-gray-800 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all duration-300 cursor-pointer"
>
  <StepBack size={18} />
  <span>Back</span>
</Link>
        <h2 className="text-3xl font-bold text-center mb-6">
          Add New User
        </h2>

        <form className="space-y-5" onSubmit={sumbitForm}>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold"
            >
              Name
            </label>

            <input
            onChange={inputHandler}
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold"
            >
              Email
            </label>

            <input
            onChange={inputHandler}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 font-semibold"
            >
              Address
            </label>

            <input
            onChange={inputHandler}
              id="address"
              name="address"
              type="text"
              placeholder="Enter your address"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="sumbit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 cursor-pointer"
          >
            Add User
          </button>

        </form>
      </div>
    </div>
  );
}