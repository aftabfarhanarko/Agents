import express from "express";
import { getAllUser , postUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/user", getAllUser);
router.post("/user", postUser)

export default router;
