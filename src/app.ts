import express from "express";
import dotenv from "dotenv";
import productsRouter from "./products/productRoutes";
dotenv.config();

const app = express();

app.disable("x-powered-by");

app.get("/", (_req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.use("/products", productsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});