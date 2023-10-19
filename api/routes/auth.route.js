import express from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";

// Express Router oluştur
const router = express.Router();

// "/signup" yoluna gelen POST isteğini "signup" işlevine yönlendir
router.post("/signup", signup);

// "/signin" yoluna gelen POST isteğini "signin" işlevine yönlendir
router.post("/signin", signin);

// "/signout" yoluna gelen GET isteğini "signout" işlevine yönlendir
router.get("/signout", signout);

// Router'i dışa aktar
export default router;
