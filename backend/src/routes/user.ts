import { Router } from "express";
import { userLogin, userRegister, username } from "../contollers/user.controller";

const router = Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/:email', username);

export { router };