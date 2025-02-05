"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./products/productRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.get("/", (_req, res) => {
    res.send("<h1>Hello World!</h1>");
});
app.use("/products", productRoutes_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
