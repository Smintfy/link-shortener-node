import express from "express";

const app = express();
const port = 3000;

app.post("/", (req, res) => {
    res.send("Got a POST request");
});

app.get("/", (req, res) => {
    res.send("Got a GET request");
});

app.put("/api", (req, res) => {
    res.send("Got a PUT request at /api");
});

app.delete("/api", (req, res) => {
    res.send("Got a DELETE request at /api");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
