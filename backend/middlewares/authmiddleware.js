const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user; // Attach user to request
        next(); // Allow access
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

module.exports = requireAuth;
