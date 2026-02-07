import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy,
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
    @Inject('SEARCH_CLIENT') private readonly searchClient: ClientProxy,
    private readonly gatewayService: GatewayService,
  ) { }

  @Get('health')
  async healthCheck() {
    const ping = async (serviceName: string, client: ClientProxy) => {
      try {
        const response = await firstValueFrom(client.send('service.ping', { from: 'gateway' }));
        return { ok: true, service: serviceName, status: 'healthy', response };
      } catch (error: any) {
        return { ok: false, service: serviceName, status: 'unhealthy', error: error.message };
      }
    }

    const [catalogStatus, mediaStatus, searchStatus] = await Promise.all([
      ping('catalog', this.catalogClient),
      ping('media', this.mediaClient),
      ping('search', this.searchClient),
    ]);

    const ok = [catalogStatus, mediaStatus, searchStatus].every(status => status.ok);

    return { catalogStatus, mediaStatus, searchStatus, ok };
  }
}
