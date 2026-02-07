import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  ping() {
    return {
      status: 'ok',
      service: "search",
      now: new Date()
    }
  }
}
