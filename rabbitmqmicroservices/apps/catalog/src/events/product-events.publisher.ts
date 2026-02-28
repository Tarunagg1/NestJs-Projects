import { Inject, Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ProductCreatedEvents } from "../products/product.events";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ProductEventPubliser implements OnModuleInit {
    private readonly logger = new Logger(ProductEventPubliser.name);

    constructor(
        @Inject('SEARCH_EVENT_SERVICE') private readonly searchEventClient: ClientProxy
    ) { }


    async onModuleInit() {
        await this.searchEventClient.connect()
        this.logger.log('Connected to Search Event Service');
    }

    async productCreatedEvent(event: ProductCreatedEvents) {
        try {
            console.log(event, "Event is now logged");
            await firstValueFrom(
                this.searchEventClient.emit('upsertFromCatalogEvent', event)
            )

        } catch (error) {
            this.logger.error(`Failed to publish product created event`);
        }
    }
}