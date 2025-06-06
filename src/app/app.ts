import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { serverConfig } from '../config/app.config';
import { connectDB } from '../config/database';
import productRoutes from '../routes/product.routes'
import authRoutes from '../routes/auth.routes';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan(serverConfig.isProduction ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// // Routes
app.use('/api/products', productRoutes);
 app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', environment: serverConfig.env });
});


// // Error handling
// app.use(errorHandler);
// app.use(notFoundHandler);

export default app;