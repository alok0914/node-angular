"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_ctrl_1 = __importDefault(require("../controllers/product.ctrl"));
const multer_middleware_1 = require("../middleware/multer.middleware");
// import { authMiddleware } from '../middleware/auth.middleware';
// import { adminMiddleware } from '../middleware/admin.middleware';
const router = express_1.default.Router();
// Configure multer for file uploads (max 5 files)
const uploadMultiple = multer_middleware_1.upload.array('images', 5);
// Public routes
router.get('/', product_ctrl_1.default.getProducts);
router.get('/:id', product_ctrl_1.default.getProductById);
// Protected admin routes
router.post('/', uploadMultiple, product_ctrl_1.default.createProduct);
router.put('/:id', uploadMultiple, product_ctrl_1.default.updateProduct);
router.delete('/:id', product_ctrl_1.default.deleteProduct);
exports.default = router;
