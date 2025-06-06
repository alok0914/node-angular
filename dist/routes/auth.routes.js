"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_ctrl_1 = __importDefault(require("../controllers/auth.ctrl"));
// import { authMiddleware } from '../middleware/auth.middleware';
const router = express_1.default.Router();
router.post('/register', auth_ctrl_1.default.register);
router.post('/login', auth_ctrl_1.default.login);
router.get('/me', auth_ctrl_1.default.getCurrentUser);
exports.default = router;
