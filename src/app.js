import express from "express";
import "dotenv/config";
import router from "./routes/link.js";
import connectDB from "./core/db.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use("/", router);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on ${port}`);
});
