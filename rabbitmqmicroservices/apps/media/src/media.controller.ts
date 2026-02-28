import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttachToProductDto, CreateMediaDto } from './media/media.dto';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @MessagePattern("media.uploadProductImages")
  uploadProductImage(@Payload() payload: CreateMediaDto) {
    return this.mediaService.uploadProfilePicture(payload);
  }

  @MessagePattern("media.attachToProduct")
  attachToProduct(@Payload() payload: AttachToProductDto) {
    return this.mediaService.attachToProduct(payload);
  }

  @MessagePattern("service.ping")
  ping() {
    return this.mediaService.ping();
  }
}
