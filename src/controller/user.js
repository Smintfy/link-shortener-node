import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        user = new User({ username, email, password });

        // TODO: fix password body still accept password less than 6 characters
        // this is because the password gets hashed to 10 characters
        // so validator think it's more than 6 characters!
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
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function login(req, res) {
    // TODO: validate email and password body
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // payload for auth
        const payload = {
            user: {
                id: user.id,
            },
        };

        // create token
        jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
            if (error) {
                console.error(error.message);
            }
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}
