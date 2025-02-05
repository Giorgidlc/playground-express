import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Hello Product!</h1>");
});

export default router;