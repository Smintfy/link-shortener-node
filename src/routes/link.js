import express from "express";
import fs from "fs";
import { uid } from "../utils/uid.js";

const router = express.Router();
const JSON_PATH = process.env.JSON_PATH;

router.use(express.json());

// Create a new link
router.post("/", (req, res) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({ error: "Link is required" });
    }

    // Write to mock database
    fs.readFile(JSON_PATH, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error Reading file" });
        }

        let links = JSON.parse(data);

        const id = uid(8);
        const newLink = { id: id, link: `${req.protocol}://${req.get("host")}/${id}`, url: link };

        links.push(newLink);

        fs.writeFile(JSON_PATH, JSON.stringify(links, null, 4), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error writing file" });
            }
            res.json(newLink);
        });
    });
});

// Retrieve the link
router.get("/:id", (req, res) => {
    const { id } = req.params;

    // Retrieve link with the corresponding id from mock database
    fs.readFile(JSON_PATH, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error reading file" });
        }

        const links = JSON.parse(data);
        const link = links.find((link) => link.id === id);

        if (!link) {
            return res.status(404).json({ error: "Link not found" });
        }
        res.json(link);
    });
});

// Delete existing link
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    // Delete existing link with the corresponding id from mock database
    fs.readFile(JSON_PATH, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error reading file" });
        }

        const links = JSON.parse(data);
        const index = links.findIndex((link) => link.id === id);

        // findIndex() The index of the first element in the array that passes the test. Otherwise, -1
        if (index === -1) {
            return res.status(404).json({ error: "Link not found" });
        }

        // Delete the item at position index
        links.splice(index, 1);

        fs.writeFile(JSON_PATH, JSON.stringify(links, null, 4), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error writing file" });
            }
            res.json({ message: "Link deleted successfully" });
        });
    });
});

export default router;
