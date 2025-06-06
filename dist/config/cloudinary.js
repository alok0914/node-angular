"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const app_config_1 = require("./app.config");
cloudinary_1.v2.config({
    cloud_name: app_config_1.cloudinaryConfig.cloudName,
    api_key: app_config_1.cloudinaryConfig.apiKey,
    api_secret: app_config_1.cloudinaryConfig.apiSecret,
    secure: true,
});
exports.default = cloudinary_1.v2;
