"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const app_config_1 = require("../config/app.config");
const database_1 = require("../config/database");
const product_routes_1 = __importDefault(require("../routes/product.routes"));
const note_routes_1 = __importDefault(require("../routes/note.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)(app_config_1.serverConfig.isProduction ? 'combined' : 'dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Database connection
(0, database_1.connectDB)();
// // Routes
app.use('/api/products', product_routes_1.default);
app.use('/api/notes', note_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', environment: app_config_1.serverConfig.env });
});
// // Error handling
// app.use(errorHandler);
// app.use(notFoundHandler);
exports.default = app;
