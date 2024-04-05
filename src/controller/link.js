import User from "../model/user.js";
import Link from "../model/link.js";
import { nanoid } from "nanoid";

export async function getAllLinks(req, res) {
    const userId = req.user.id;

    try {
        const links = await Link.find({ user: userId }).sort("createdAt");
        if (!links) {
            return res.status(404).json({ error: "No link has been created." });
        }
        res.status(200).json({ links, count: links.length });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function getLink(req, res) {
    const userId = req.user.id;
    const linkId = req.params.id;

    try {
        const link = await Link.findOne({
            _id: linkId,
            user: userId,
        });
        if (!link) {
            return res.status(404).json({ error: `No link with the id ${linkId} exist.` });
        }
        res.status(200).json({ link });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function createLink(req, res) {
    const { key, url } = req.body;
    const userId = req.user.id;
    // The short link slug. Default to a random 7-characters slug if not provided.
    const slug = key || nanoid(7);

    try {
        const user = await User.findById(userId);
        let link = await Link.findOne({ key });
        if (link) {
            return res.status(400).json({ error: "A link with this slug already exist" });
        }

        link = new Link({
            key: slug,
            url,
            shortLink: `${req.protocol}://${req.get("host")}/${slug}`,
            user: user._id,
        });

        await link.save();
        res.status(200).json({ message: "Successfully created short link", link });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function updateLink(req, res) {
    // TODO: Validate url and link from req body
    const userId = req.user.id;
    const linkId = req.params.id;

    try {
        const newLink = await Link.findByIdAndUpdate(
            {
                _id: linkId,
                user: userId,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!newLink) {
            return res.status(404).json({ error: `No link with the id ${linkId} exist.` });
        }
        res.status(200).json({ message: "Successfully updated short link", newLink });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function deleteLink(req, res) {
    const userId = req.user.id;
    const linkId = req.params.id;

    try {
        const link = await Link.findByIdAndDelete({
            _id: linkId,
            user: userId,
        });
        if (!link) {
            return res.status(404).json({ error: `No link with the id ${linkId} exist.` });
        }
        res.status(200).json({ message: "Successfully deleted short link" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}
