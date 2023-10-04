import { Router } from "express";
import { checkJWT } from "../middleware/session";
import { getAllCrafts } from "../contollers/craft.controller";

const router = Router();

router.get('/', checkJWT, getAllCrafts);

export {router}