import express from "express";
const router = express.Router();
import Gestor from "../models/gestorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Log in
router.post("/auth/login", async (req, res) => {
  //const { userName, password } = req.body;
  const userName = req.body.userName;
  const password = req.body.password;
  // Look for user email in the database
  console.log(userName)
  const gestor = await Gestor.findOne({
    userName: req.body.userName,
  });

  // If user not found, send error message
  if (!gestor) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  }

  // Compare hased password with user password to see if they are valid
  let isMatch = await bcrypt.compare(password, gestor.password);

  if (!isMatch) {
    return res.status(401).json({
      errors: [
        {
          msg: "Email or password is invalid",
        },
      ],
    });
  }

  // Send JWT access token
  const accessToken = jwt.sign({ userName }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  // Refresh token
  const refreshToken = jwt.sign(
    { userName },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );

  // Set refersh token in refreshTokens array
  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
});

let refreshTokens = [];

// Create new access token from refresh token
router.post("/token", async (req, res) => {
  const refreshToken = req.header("x-auth-token");

  // If token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // If token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }

  try {
    const gestor = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
    const { userName } = gestor;
    const accessToken = jwt.sign(
      { userName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
});

// Deauthenticate - log out
// Delete refresh token
router.delete("/logout", (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

export default router;
