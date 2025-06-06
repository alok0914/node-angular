import express from 'express';
import AuthController from '../controllers/auth.ctrl';
// import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me',  AuthController.getCurrentUser);

export default router;