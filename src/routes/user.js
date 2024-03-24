import express from "express";
import mongoose from "mongoose";
import User from "../model/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // find if the email from the request body already exist
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User already exists " });
        }

        // create a new user
        user = new User({ username, email, password });
        await user.save();

        res.json({
            message: "Successfully created user",
            user,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errors = {};

            // extract and format validation errors
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).send("Server Error");
    }
});

export default router;
