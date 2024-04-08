import { Router } from "express";

import link from "../middleware/link.js";
import auth from "../middleware/auth.js";

import userRouter from "./user.js";
import linkRouter from "./link.js";

const router = Router();

router.use("/api/user", userRouter);
router.use("/api/link", auth, linkRouter);

// middleware
// router.all("*", (req, res) => res.sendStatus(404));
router.use("/:key", link);

export default router;
