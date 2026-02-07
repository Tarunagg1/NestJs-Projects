import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  ping() {
    return {
      status: 'ok',
      servide: "media",
      now: new Date()
    }
  }
}
