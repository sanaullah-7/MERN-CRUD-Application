import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        requried:true,
    },
    email:{
        type : String,
        requried:true,
    },
    address:{
        type : String,
        requried:true,
    },
   
},
{
  timestamps:true, // create and upate time
})

export default mongoose.model("User", userSchema)