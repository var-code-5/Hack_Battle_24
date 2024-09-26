import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();
const db = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const views_path = path.join(__dirname, "..", "views");

var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

function generateAcessToken(id, username) {
  const token = jwt.sign({ "id": id, "username": username }, process.env.ACESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

function generateRefreshToken(email, name, id) {
  const refreshToken = jwt.sign(
    { "email": email, "username": name, "id": id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15d" }
  );
  return refreshToken;
}

async function verifyMail(email, token) {
  const link = "localhost:3000/auth/token/" + token;
  const info = await transporter.sendMail({
    from: '"Travelio" <ao3gdsc@gmail.com>',
    to: email,
    subject: "Confirm Your Mail Account",
    html: `To activate your account, please follow the link <a href="${link}">HERE</a>. You will be redirected to the Travelio website after this. <br> <b>Note: this link will expire in one hour</b> if you are not able to click it please follow ${link}`,
  });
}

export const get_login = (req, res) => {
  res.sendFile(path.join(views_path, "register.html"));
};

export const post_login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      res.status(401).json({ message: "User does not exist" });
      return;
    }

    if (!user.verified) {
      res.status(403).json({ message: "Please verify your mail address" });
      verifyMail(email, jwt.sign({ "email": email }, process.env.ACESS_TOKEN_SECRET, { expiresIn: "1h" }));
      return;
    }
    const isMatch = bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateAcessToken(user.id, user.username);
    const refreshToken = generateRefreshToken(email, user.username, user.id);

    res.status(200).json({ accessToken: token, refreshToken: refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const post_register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const existingUser = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });

    res.status(200).json({ success: "true", msg: "Check your email" });

    verifyMail(email, jwt.sign({ "email": email }, process.env.ACESS_TOKEN_SECRET, { expiresIn: "1h" }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const get_token = async (req, res) => {
  const token = req.params.token;
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Token is not valid" });
      return;
    } else {
      await db.user.update({
        where: { email: decoded.email },
        data: { verified: true },
      });
      res.status(200).json({ message: "Verified email" });
    }
  });
};

export const get_verify = (req, res) => {
  res.json({ message: "success" });
};
