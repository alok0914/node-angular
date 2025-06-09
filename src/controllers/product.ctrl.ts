import { Request, Response } from 'express';
import Product from '../models/product';
import { IProduct } from '../models/product';
import { Types } from 'mongoose';

interface IProductRequest extends Request {
  files: Express.Multer.File[];
}

class ProductController {
  async createProduct(req: IProductRequest, res:any): Promise<any> {
    console.log('product req', req.body)
    try {
      const { name, description, price, category, stock } = req.body;
      
      // Validate input
      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      // Create product
      const product = new Product({
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
      });

      await product.save();

      return res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async getProducts(req: Request, res: Response): Promise<any> {
    try {
      const { page = 1, limit = 10, category, search } = req.query;
      
      const filter: any = {};
      if (category) filter.category = category;
      if (search) filter.name = { $regex: search as string, $options: 'i' };

      const products = await Product.find(filter)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .sort({ createdAt: -1 });

      const total = await Product.countDocuments(filter);

      return res.json({
        products,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async updateProduct(req:any, res:any): Promise<any> {
    try {
      const { id } = req.params;
      const { name, description, price, category, stock } = req.body;
      
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await Product.findById(id);
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
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new ProductController();