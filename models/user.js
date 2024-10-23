const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        require: true,
        trim: true,
    },
    email:{
        type:String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
      },
    contact:{
        type:Number,
        default: null,
    },
    age:{
        type:Number,
        min: 23,
    },
    status:{
        type:Boolean,
        default: false,
    }
},  { timestamps: true}
);

const User = model("users", userSchema);

module.exports = {
    userModel: User,
};