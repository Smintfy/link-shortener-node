import express from "express";
import router from "./routes/link.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", router);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return process.exit(1);
    }
    console.log(`Server is running on ${port}`);
});
