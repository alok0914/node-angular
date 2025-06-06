import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/app.config';

class AuthController {
  async register(req: Request, res: Response):Promise<any> {
    try {
      const { name, email, password, role } = req.body;
      console.log("in register route...")
      
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Create user
      const user = new User({ name, email, password, role });
      await user.save();

      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, jwtConfig.secret, {
        expiresIn: '1d',
      });

      res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req: Request, res: Response):Promise<any> {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, jwtConfig.secret, {
        expiresIn: '1d',
      });

      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getCurrentUser(req:any, res: Response):Promise<any> {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new AuthController();