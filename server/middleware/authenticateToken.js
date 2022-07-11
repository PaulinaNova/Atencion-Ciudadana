import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const authToken = async (req, res, next) => {
  const token = req.header("x-auth-token");
  // If token not found, send error message
  if (!token) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // Authenticate token
  try {
    const gestor = jwt.verify(token, "secret");
    req.userName = gestor.userName;
    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};

export default authToken;
