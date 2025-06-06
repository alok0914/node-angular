"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../config/app.config");
class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            console.log("in register route...");
            // Check if user exists
            const existingUser = await user_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            // Create user
            const user = new user_1.default({ name, email, password, role });
            await user.save();
            // Generate token
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, app_config_1.jwtConfig.secret, {
                expiresIn: '1d',
            });
            res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        }
        catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Find user
            const user = await user_1.default.findOne({ email }).select('+password');
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Generate token
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, app_config_1.jwtConfig.secret, {
                expiresIn: '1d',
            });
            res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        }
        catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
    async getCurrentUser(req, res) {
        try {
            const user = await user_1.default.findById(req.user.id).select('-password');
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}
exports.default = new AuthController();
