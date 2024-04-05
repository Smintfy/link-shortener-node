import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    // extract token from authorization header
    const authHeader = req.headers.authorization;

    // check authorization header
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                res.status(401).json({ msg: "Unauthorized access" });
            } else {
                // payload from creating token
                req.user = decoded.user;

                // forward the payload
                next();
            }
        });
    } catch (err) {
        console.error("Middleware Error");
        res.status(500).json({ msg: "Server Error" });
    }
};
