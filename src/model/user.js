import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        trim: true,
        minlength: [4, "Username must be at least 4 characters."],
        maxlength: [20, "Username can not exceed 20 characters."],
        description: "The username of the user.",
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: isEmail,
            message: "Please include a valid email address.",
        },
        description: "The email address of the user.",
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters."],
        select: false,
        description: "The password of the user.",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        description: "The date and time when the user was created.",
    },
});

const User = mongoose.model("User", userSchema);

export default User;
