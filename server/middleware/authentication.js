import jwt from "jsonwebtoken";

export async function authenticate(req, res, next) {
    const autheader = req.headers.authorization;
    
    if(!autheader || !autheader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Authentication required",
        });
    }

    const token = autheader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = payload.userId;

        next();
    } catch {
        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }
}