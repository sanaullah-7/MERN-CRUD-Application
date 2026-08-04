import user from "../../../models/user.js";
import User from "../models/user.model.js";

// creat new user / or post user data into database
export const create = async (req , res) =>{
    try {
       const newUser = new User(req.body);
       const {email} = newUser;
       
       const userExist = await User.findOne({email})
       if(userExist){
        // bad request
        return res.status(400).send({measage : "User already exist"})
       }

       const saveData = await newUser.save();
    //    res.status(200).json(saveData);
       res.status(200).json({message : "User Created Sucessfully!"});
       
    }
     catch (error)
      {
        // internal server error
        res.status(500).json({errorMessage: error.message})
    }
}

// get all user
export const getAllUser = async (req , res) => {
    try {
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({message: "User Not Found"})
        }
        res.status(200).json({userData})
    } 
    catch (error)
     {
        res.status(500).json({errorMessage: error.measage})
    }
}

// get specific user data
export const getUserById = async (req , res) => {
    try
     {
        const id  = req.params.id;//URL me :id ki value.
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User Not Found"})

        }
        res.status(200).json(userExist)
    } 
    catch (error)
     {
        res.status(500).json({errorMessage: error.measage})
    }
}

// update user
export const upateUser =  async (req , res)=>{
    try {
        const id  = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message : "User Not Found"})
        }
        const updateUser = await User.findByIdAndUpdate(id , req.body, {
            new:true,
        })
        res.status(200).json({updateUser,message:"User Updated Sucessfully!"})
    } 
    catch (error) 
    {
        res.status(500).json({errorMessage: error.measage})
        
    }
}
// delete user 

export const deleteUser = async (req , res ) => {
       
    try {
        const id  = req.params.id;
         const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message : "User Not Found"})
        }
         await User.findByIdAndDelete(id);
        res.status(200).json({message : "User Deleted Sucessfully"})
       
    } catch 
    (error) {
        res.status(500).json({
             success: false,
            message: "Internal Server Error",
            errorMessage: error.message
        })
        
    }
}