import express from "express";
import * as func from "./controllers/auth.js";
import { hashPassword } from "./middleware/auth_middleware.js";
import bodyParser from 'body-parser';
import {verify_token} from "./middleware/api_middleware.js"

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));

//login routes
router.post("/login", func.post_login);
router.post("/register", hashPassword ,func.post_register);
router.get("/token/:token", func.get_token);
router.get("/validate",verify_token,func.get_verify);

export default router;
