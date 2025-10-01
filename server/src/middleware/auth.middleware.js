import jwt from "jsonwebtoken";
import User from "../models/User";

export const Protact = async (req, resizeBy, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
          token = req.headers.authorization.split(" ")[1];
    
          const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    
          req.user = await User.findById(decoded.id).select("-password");
    
          if (!req.user) {
            return res.status(401).json({ message: "User not found" });
          }
    
          next();
        } catch (error) {
          return res.status(401).json({ message: "Not authorized, token failed" });
        }
      }
    
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
    };
