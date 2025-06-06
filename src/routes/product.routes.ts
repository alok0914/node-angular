import express from 'express';
import ProductController from '../controllers/product.ctrl';
import { upload } from '../middleware/multer.middleware';
// import { authMiddleware } from '../middleware/auth.middleware';
// import { adminMiddleware } from '../middleware/admin.middleware';

const router = express.Router();

// Configure multer for file uploads (max 5 files)
const uploadMultiple = upload.array('images', 5);

// Public routes
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

// Protected admin routes
router.post('/',  uploadMultiple, ProductController.createProduct);
router.put('/:id', uploadMultiple, ProductController.updateProduct);
router.delete('/:id',  ProductController.deleteProduct);

export default router;