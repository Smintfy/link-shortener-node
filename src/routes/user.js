import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.js";
import validationError from "./helper/validationError.js";

const router = express.Router();

// Register user
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

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // payload for auth
        const payload = {
            user: {
                id: user.id,
            },
        };

        // create token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 144000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(validationError(error));
        }
        console.error(error);
        res.status(500).send("Server Error");
    }
});

export default router;
