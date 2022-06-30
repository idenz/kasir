'use strict';

 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 
 const UserSchema = new Schema(
   {
     full_name: {
       type: String,
       required: [true, "First Name is Required"],
     },
     email: {
       type: String,
       required: [true, "Email is Required"],
     },
     password: {
      type: String,
      required: [false],
    },
 
     // flag
     isDelete: {
       type: Boolean,
       required: [false],
       default: false,
     },
   },
   { collection: "users" }
 );
 
 const User = mongoose.model("User", UserSchema);
 module.exports = User;
 