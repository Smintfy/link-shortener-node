import Link from "../model/link.js";

export default async (req, res) => {
    const { key } = req.params;

    try {
        let link = await Link.findOne({ key });

        if (!link) {
            return res.status(404).json({ error: "Link does not exist" });
        }

        // increment the click each time the link is redirected to destination url
        link.click += 1;
        await link.save();

        res.redirect(link.url);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
