import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/listing.controller.js";

// Express Router oluştur
const router = express.Router();

// "/create" yoluna gelen POST isteğini "createListing" işlevine yönlendir
router.post("/create", createListing);

// "/delete/:id" yoluna gelen DELETE isteğini "deleteListing" işlevine yönlendir
router.delete("/delete/:id", deleteListing);

// "/update/:id" yoluna gelen POST isteğini "updateListing" işlevine yönlendir
router.post("/:id", updateListing);

// "/get/:id" yoluna gelen GET isteğini "getListing" işlevine yönlendir
router.get("/get/:id", getListing);

// Router'i dışa aktar
export default router;
