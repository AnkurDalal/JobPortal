import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controller/userController.js";
import upload from "../config/multer.js";
import { requireAuth } from "@clerk/express"; 

const router = express.Router();


router.get("/user", requireAuth(), getUserData);
router.post("/apply", requireAuth(), applyForJob);
router.get("/applications", requireAuth(), getUserJobApplications);
router.post("/update-resume", requireAuth(), upload.single("resume"), updateUserResume);

export default router;
