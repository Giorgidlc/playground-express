
import { Router } from "express";
import ProductsController from "./productServices";

const router = Router();

router.get("/", ProductsController.getAll);

export default router;