import { randomUUID } from 'node:crypto';

import db from '../database/config';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default class ProductsModel {
  static async getAll(): Promise<Product[]> {
    try {
      const result = await db.execute('SELECT * FROM products');
      return result.rows as unknown as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(`Error getting products: ${error}`);
    }
  };

  static async getById(id: string): Promise<Product | null> {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM products WHERE id = ?',
        args: [id]
      });
      return result.rows[0] as unknown as Product | null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw new Error(`Error getting product by ID: ${error}`);
    }
  };

  static async create(productData: Omit<Product, 'id'>): Promise<Product> {
    try {
      const newProduct = {
        id: randomUUID(), 
        ...productData
      };
      await db.execute({
        sql: 'INSERT INTO products (id, name, price, description) VALUES (?, ?, ?, ?)',
        args: [newProduct.id, newProduct.name, newProduct.price, newProduct.description]
      });

      return newProduct;

    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error(`Error creating product: ${error}`);
    }
  }

  static async update(id: string, productData: Omit<Product, 'id'>): Promise<Product> {
    try {
      const currtentProduct = await this.getById(id);
      if (!currtentProduct) {
        throw new Error('Product not found');
      }

      const updatedProduct = {
        ...currtentProduct,
        ...productData
      };

      await db.execute({
        sql: 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
        args: [updatedProduct.name, updatedProduct.price, updatedProduct.description, id]
      });
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error(`Error updating product: ${error}`);
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await db.execute({
        sql: 'DELETE FROM products WHERE id = ?',
        args: [id]
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error(`Error deleting product: ${error}`);
    }
  }
};