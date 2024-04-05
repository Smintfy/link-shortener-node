import express from "express";
import "dotenv/config";

import connectDB from "./core/db.js";

// middleware
import notFound from "./middleware/notFound.js";
import auth from "./middleware/auth.js";
import link from "./middleware/link.js";

// router
import userRouter from "./routes/user.js";
import linkRouter from "./routes/link.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize routes
app.use("/api/user", userRouter);
app.use("/api/link", auth, linkRouter);

app.use(notFound);
// middleware to redirect short link to the url destination
app.use("/:key", link);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on ${port}`);
});
