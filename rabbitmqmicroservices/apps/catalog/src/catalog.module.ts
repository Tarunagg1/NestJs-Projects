import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './products/product.schema';
import { ProductController } from './products/product.controller';
import { ProductsService } from './products/products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductEventPubliser } from './events/product-events.publisher';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
    ClientsModule.register([
      {
        name: "SEARCH_EVENT_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL ?? "amqp://localhost:5672"],
          queue: process.env.SEARCH_EVENT_QUEUE ?? "search_event",
          queueOptions: {
            durable: false
          },
        }
      }
    ])
  ],
  controllers: [CatalogController, ProductController],
  providers: [CatalogService, ProductsService, ProductEventPubliser],
})
export class CatalogModule { }
