"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const config_1 = __importDefault(require("../database/config"));
class ProductsModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.execute('SELECT * FROM products');
                return result.rows;
            }
            catch (error) {
                console.error('Error fetching products:', error);
                throw new Error(`Error getting products: ${error}`);
            }
        });
    }
    ;
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.execute({
                    sql: 'SELECT * FROM products WHERE id = ?',
                    args: [id]
                });
                return result.rows[0];
            }
            catch (error) {
                console.error('Error fetching product by ID:', error);
                throw new Error(`Error getting product by ID: ${error}`);
            }
        });
    }
    ;
    static create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = Object.assign({ id: (0, node_crypto_1.randomUUID)() }, productData);
                yield config_1.default.execute({
                    sql: 'INSERT INTO products (id, name, price, description) VALUES (?, ?, ?, ?)',
                    args: [newProduct.id, newProduct.name, newProduct.price, newProduct.description]
                });
                return newProduct;
            }
            catch (error) {
                console.error('Error creating product:', error);
                throw new Error(`Error creating product: ${error}`);
            }
        });
    }
    static update(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currtentProduct = yield this.getById(id);
                if (!currtentProduct) {
                    throw new Error('Product not found');
                }
                const updatedProduct = Object.assign(Object.assign({}, currtentProduct), productData);
                yield config_1.default.execute({
                    sql: 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
                    args: [updatedProduct.name, updatedProduct.price, updatedProduct.description, id]
                });
                return updatedProduct;
            }
            catch (error) {
                console.error('Error updating product:', error);
                throw new Error(`Error updating product: ${error}`);
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.default.execute({
                    sql: 'DELETE FROM products WHERE id = ?',
                    args: [id]
                });
            }
            catch (error) {
                console.error('Error deleting product:', error);
                throw new Error(`Error deleting product: ${error}`);
            }
        });
    }
}
exports.default = ProductsModel;
;
