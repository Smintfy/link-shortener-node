import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on ${port}`);
});
