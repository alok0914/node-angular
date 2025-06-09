"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const mongoose_1 = require("mongoose");
class ProductController {
    async createProduct(req, res) {
        console.log('product req', req.body);
        try {
            const { name, description, price, category, stock } = req.body;
            // Validate input
            if (!name || !description || !price || !category || !stock) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            // Create product
            const product = new product_1.default({
                name,
                description,
                price: Number(price),
                category,
                stock: Number(stock),
            });
            await product.save();
            return res.status(201).json(product);
        }
        catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    async getProducts(req, res) {
        try {
            const { page = 1, limit = 10, category, search } = req.query;
            const filter = {};
            if (category)
                filter.category = category;
            if (search)
                filter.name = { $regex: search, $options: 'i' };
            const products = await product_1.default.find(filter)
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit))
                .sort({ createdAt: -1 });
            const total = await product_1.default.countDocuments(filter);
            return res.json({
                products,
                total,
                page: Number(page),
                pages: Math.ceil(total / Number(limit)),
            });
        }
        catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            const product = await product_1.default.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.json(product);
        }
        catch (error) {
            console.error('Error fetching product:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price, category, stock } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            const product = await product_1.default.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            // Update product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price ? Number(price) : product.price;
            product.category = category || product.category;
            product.stock = stock ? Number(stock) : product.stock;
            await product.save();
            return res.json(product);
        }
        catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            const product = await product_1.default.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.json({ message: 'Product deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
exports.default = new ProductController();
