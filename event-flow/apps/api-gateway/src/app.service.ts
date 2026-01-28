import { SERVICE_PORTS, SERVICES } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `API Gateway Service is up and running! on PORT ${SERVICE_PORTS.API_GATEWAY}`;
  }
}
