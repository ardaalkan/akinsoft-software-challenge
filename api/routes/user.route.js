import express from "express";
import { test, getUserListings } from "../controllers/user.controller.js";

// Express Router oluştur
const router = express.Router();

// "/test" yoluna gelen GET isteğini "test" işlevine yönlendir
router.get("/test", test);

// "/listings/:id" yoluna gelen GET isteğini "getUserListings" işlevine yönlendir
router.get("/listings/:id", getUserListings);

// Router'i dışa aktar
export default router;
