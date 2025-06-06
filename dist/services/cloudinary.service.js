"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
class CloudinaryService {
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            cloudinary_1.default.uploader
                .upload_stream({
                resource_type: 'image',
                folder: 'products',
            }, (error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error('Upload failed'));
                resolve(result);
            })
                .end(file.buffer);
        });
    }
    async deleteImage(publicId) {
        await cloudinary_1.default.uploader.destroy(publicId);
    }
}
exports.default = new CloudinaryService();
