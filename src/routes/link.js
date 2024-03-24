import express from "express";
import mongoose from "mongoose";
import User from "../model/user.js";
import Link from "../model/link.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { key, url } = req.body;

    // dummy user id until auth is implemented
    // {
    //     "username": "test",
    //     "email": "test@gmail.com",
    //     "password": "test1234"
    // }
    req.user = { id: "65ffe3fe67273686a0118a17" };

    try {
        let user = await User.findById(req.user.id);

        // find if the key from the request body already exist
        let link = await Link.findOne({ key });

        if (link) {
            return res.status(400).json({ error: "A link with this slug already exist" });
        }

        // create a new short link
        link = new Link({
            key,
            url,
            shortLink: `http://localhost:3000/${key}`,
            user: user._id,
        });
        await link.save();

        res.json({
            message: "Successfully created short link",
            link,
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
