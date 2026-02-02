import { CreateEventDto } from '@app/common/dto/create-event.dto';
import { UpdateEventDto } from '@app/common/dto/update-event.dto';
import { DatabaseService } from '@app/database';
import { events } from '@app/database/schema';
import { KAFKA_SERVICE, KAFKA_TOPIC } from '@app/kafka';
import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsServiceService implements OnModuleInit {

  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaService: ClientKafka,
    private readonly dbService: DatabaseService,
  ) { }

  onModuleInit() {
    // Initialization logic here
    this.kafkaService.connect();
  }

  async create(createEventDto: CreateEventDto, organizerId: string) {
    console.log({
      ...createEventDto,
      date: new Date(createEventDto.date),
      organizerId,
      price: createEventDto.price || 0,
    });

    const [event] = await this.dbService.db.insert(events).values({
      ...createEventDto,
      date: new Date(createEventDto.date),
      organizerId,
      price: createEventDto.price || 0,
    }).returning();

    // Emit event created message to Kafka
    this.kafkaService.emit(KAFKA_TOPIC.EVENT_CREATED, {
      eventId: event.id,
      title: event.title,
      organizerId: event.organizerId,
      timestamp: new Date().toISOString()
    });

    return event;
  }

  async findAll() {
    return this.dbService.db.select().from(events).where(eq(events.status, "PUBLISHED"));
  }

  async findOne(id: string) {
    const [event] = await this.dbService.db.select().from(events).where(eq(events.id, id)).limit(1);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string, userRole: string) {
    const event = await this.findOne(id);
    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new NotFoundException('Event not found');
    }
    const updatedValues: Partial<typeof events.$inferSelect> = { ...updateEventDto };
    if (updateEventDto.date) {
      updatedValues.date = new Date(updateEventDto.date);
    }
    const [updatedEvent] = await this.dbService.db.update(events).set(updatedValues).where(eq(events.id, id)).returning();


    this.kafkaService.emit(KAFKA_TOPIC.EVENT_UPDATED, {
      eventId: updatedEvent.id,
      title: updatedEvent.title,
      organizerId: updatedEvent.organizerId,
      timestamp: new Date().toISOString()
    });

    return updatedEvent;
  }


  async publlishEvent(id: string, userId: string, userRole: string) {
    const event = await this.findOne(id);
    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new NotFoundException('Event not found');
    }
    const [publishedEvent] = await this.dbService.db.update(events).set({ status: "PUBLISHED" }).where(eq(events.id, id)).returning();
    return publishedEvent;
  }


  async cancelEvent(id: string, userId: string, userRole: string) {
    const event = await this.findOne(id);
    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new NotFoundException('Event not found');
    }

    const [cancelledEvent] = await this.dbService.db.update(events).set({ status: "CANCELLED" }).where(eq(events.id, id)).returning();

    return cancelledEvent;
  }


  async findMyEvents(organizerId: string) {
    return this.dbService.db.select().from(events).where(eq(events.organizerId, organizerId));
  }

}
