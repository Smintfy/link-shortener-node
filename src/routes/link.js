import express from "express";
import { getAllLinks, getLink, createLink, updateLink, deleteLink } from "../controller/link.js";

const router = express.Router();

router.get("/", getAllLinks);
router.post("/", createLink);
router.get("/:id", getLink);
router.patch("/:id", updateLink);
router.delete("/:id", deleteLink);

export default router;
