import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    let token;

    // extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }

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
