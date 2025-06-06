"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app/app"));
const port = process.env.PORT || 5000;
const server = (0, http_1.createServer)(app_1.default);
server.listen(port, () => console.log(`server is listening to the port ${port}`));
