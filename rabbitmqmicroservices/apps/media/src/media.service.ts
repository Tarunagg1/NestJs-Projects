import { Injectable } from '@nestjs/common';
import { initCloudinary } from './cloudinary/cloudinary.client';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from './media/media.schema';
import { CreateMediaDto } from './media/media.dto';
import { UploadApiResponse } from 'cloudinary';
import { rpcBadRequest } from 'app/rpc';

@Injectable()
export class MediaService {

  private readonly cloudinary = initCloudinary();
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>
  ) {
    console.log('MediaService initialized');
  }

  async uploadProfilePicture(input: CreateMediaDto) {
    if (!input.base64) {
      rpcBadRequest('Base64 string is required');
    }

    const buffer = Buffer.from(input.base64, 'base64');
    if (!buffer.length) {
      rpcBadRequest('Invalid Base64 string');
    }

    const uploadResult = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
      this.cloudinary.uploader.upload_stream(
        { folder: 'nestja-microservice/products', public_id: `${input.fileName}-${Date.now()}`, resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    const url = uploadResult?.secure_url || uploadResult?.url;
    const publicId = uploadResult?.public_id;

    if (!url || !publicId) {
      rpcBadRequest('Failed to upload media to Cloudinary');
    }

    const media = new this.mediaModel({
      url,
      publicId,
      uploadByUserId: input.uploadByUserId,
    });


    const savedMedia = await media.save();

    return {
      id: savedMedia._id,
      url: savedMedia.url,
      publicId: savedMedia.publicId,
    };
  }

  async attachToProduct(input: { mediaId: string, productId: string }) {
    const upload = await this.mediaModel.findByIdAndUpdate(input.mediaId,
      { $set: { productId: input.productId } },
      { new: true }
    );
    if (!upload) {
      rpcBadRequest('Media not found');
    }

    return {
      mediaId: upload._id,
      productId: upload.productId,
      url: upload.url,
      publicId: upload.publicId,
    }
  }

  ping() {
    return {
      status: 'ok',
      service: "media",
      now: new Date()
    }
  }
}
