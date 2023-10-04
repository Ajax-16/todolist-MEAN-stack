import { Router } from "express";
import { upload } from "../libs/storage";
import { checkJWT } from "../middleware/session";
import { getUserDetailsFromUserId, updateUserDetailsFromUserId, checkLevel } from "../contollers/user.details.controller";

const router = Router();

router.put('/',checkJWT, upload.single('image'), updateUserDetailsFromUserId)
router.get('/', checkJWT, getUserDetailsFromUserId)
router.put('/level-check', checkJWT, checkLevel);

export { router };