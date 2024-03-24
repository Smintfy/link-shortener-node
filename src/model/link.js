import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        description: "The short link slug. Default to a random 6-characters slug if not provided.",
    },
    url: {
        type: String,
        required: [true, "Please provide the URL destination."],
        description: "The URL destination for the short link.",
    },
    shortLink: {
        type: String,
        required: true,
        description: "The URL of the short link.",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        description: "The ID of the user who created the link.",
    },
    click: {
        type: Number,
        required: true,
        default: 0,
        description: "The amount of clicks on the short link.",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        description: "The date and time when the link was created.",
    },
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
