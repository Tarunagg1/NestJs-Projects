import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {
  ping() {
    return {
      status: 'ok',
      servide: "catalog",
      now: new Date()
    }
  }
}
