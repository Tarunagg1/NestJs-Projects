import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductCreateDto } from './events/product-events.dto';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @EventPattern("upsertFromCatalogEvent")
  async onProductCreated(@Payload() product: ProductCreateDto) {
    await this.searchService.upsertFromCatalogEvent({
      productId: product.productId,
      name: product.name,
      price: product.price,
      status: product.status,
      description: product.description
    });
  }

  @MessagePattern("search.product")
  async searchProduct(@Payload() query: { name: string, limit?: number }) {
    return this.searchService.query({ q: query.name, limit: query.limit });
  }

  @MessagePattern("service.ping")
  ping() {
    return this.searchService.ping();
  }
}
