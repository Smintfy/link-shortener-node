import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import User from "../model/user.js";
import Link from "../model/link.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const { key, url } = req.body;

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
            return res.status(400).send(validationError(error));
        }
        console.error(error);
        res.status(500).send("Server Error");
    }
});

export default router;
