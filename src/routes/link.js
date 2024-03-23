import express from "express";

const router = express.Router();
router.use(express.json());

router.post("/link", (req, res) => {
    res.send("Hello world");
});

router.get("/link/:id", (req, res) => {
    res.send("Hello world");
});

router.put("/link/:id", (req, res) => {
    res.send("Hello world");
});

router.delete("/link/:id", (req, res) => {
    res.send("Hello world");
});

export default router;
