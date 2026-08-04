import React from 'react'
import User from './getUser/User'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {BrowserRouter as Router,Routes,Route} from  "react-router-dom"
import AddUser from './addUser/AddUser'
import UpdateUser from './updateUser/UpdateUser'

export default function App() {

      // const route  = createBrowserRouter([
      //    {
      //     path:"/",
      //     element:<User/>,
      //   },
      
      // ]);

  return (
    
    <div>
     <Router>

     <Routes>
       <Route path="/" element={<User/>}   />
       <Route path="/add" element={<AddUser/>}   />
       <Route path="/update" element={<UpdateUser/>}   />
       <Route path="/update/:id" element={<UpdateUser/>}   />

     </Routes>
    </Router>
    </div>
  )
}
