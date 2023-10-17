import express from "express";
import { test, getUserListings } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.get('/listings/:id', getUserListings)

export default router;
