import { Request, Response } from "express";
import ProductsModel from "./productsModel";

export default class ProductsController { 
  static async getAll(_req: Request, res: Response) {
    try {
      const products = await ProductsModel.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
    }
  };
}