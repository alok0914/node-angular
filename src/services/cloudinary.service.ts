import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            folder: 'products',
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('Upload failed'));
            resolve(result);
          }
        )
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}

export default new CloudinaryService();