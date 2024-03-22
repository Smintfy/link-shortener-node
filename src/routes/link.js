import express from "express";

const router = express.Router();

router.use(express.json());

router.post("/hello", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    res.json({ message: `Hello, ${name}!` });
});

export default router;
