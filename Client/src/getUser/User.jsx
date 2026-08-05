import React, { useEffect, useState } from 'react'
import {  UserRoundPlus, Users } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import {Link} from "react-router-dom"
import toast from 'react-hot-toast';
import api from '../../api';
export default function User() {
//curret state of user   update state store of user   
        const [users , setUsers] =  useState([]);
       useEffect(()=>{
        const fetchData = async()=>{
          try {
       const response = await api.get("/api/users");
           setUsers(response.data.userData); 
          } 
          catch (error)
           {
            console.log("Error while fetching data", error)
          }
        };
        fetchData();
       },[])


       const deleteUser = async (userId) => {
        await api.delete(`/api/delete/user/${userId}`)
        .then((res)=>{
          setUsers((prevUser) => prevUser.filter((user)=> user._id !== userId));
          toast.success(res.data.message,{position:"top-left"})
        })
        .catch((err)=>{
            console.log(err)
        })
       }
   
  return (
  <div className="flex justify-center items-center mt-20 px-4">
  <div className="p-6 md:p-10 border rounded-lg shadow-lg w-full max-w-5xl">

    <div className="flex justify-between gap-2 items-center mb-6">
      <h2 className="text-md sm:text-2xl md:text-3xl font-bold text-gray-800">User Management</h2>
      <Link to="/add" className="flex text-sm sm:text-2xl items-center sm:gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-1 sm:px-5  sm:py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
        <UserRoundPlus size={20} />
        <span>Add User</span>
      </Link>
    </div>

    {users.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
        <Users size={70} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">No Users Found</h2>
        <p className="text-gray-500 mt-2 mb-6">
          There are no users available. Click the button below to add your first user.
        </p>
        <Link to="/add" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition duration-300">
          <UserRoundPlus size={20} />
          Add First User
        </Link>
      </div>
    ) : (
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.address}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center gap-4">
                    <Link to={`/update/${user._id}`} className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-110">
                      <SquarePen size={18} />
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
  )
}
