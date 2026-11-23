import express from "express";
import { getAllUser , postUser ,loginUser} from "../controllers/user.controller";

const router = express.Router();

router.post("/login", loginUser);
router.get("/user", getAllUser);
router.post("/register", postUser);


export default router;
