import { Body, Controller, Get, Headers, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { EventsServiceService } from './events-service.service';
import { CreateEventDto } from '@app/common/dto/create-event.dto';
import { UpdateEventDto } from '@app/common/dto/update-event.dto';

@Controller("events")
export class EventsServiceController {
  constructor(private readonly eventsServiceService: EventsServiceService) { }

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto, @Headers("x-user-id") userId: string) {
    return this.eventsServiceService.create(createEventDto, userId);
  }

  @Get()
  findAll() {
    return this.eventsServiceService.findAll();
  }

  @Get("my-events")
  findMyEvents(@Headers("x-user-id") userId: string) {
    return this.eventsServiceService.findMyEvents(userId);
  }

  @Get(":id")
  findOneEvent(@Param("id", ParseUUIDPipe) id: string) {
    return this.eventsServiceService.findOne(id);
  }

  @Put(":id")
  updateEvent(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Headers("x-user-id") userId: string,
    @Headers("x-user-role") userRole: string,
  ) {
    return this.eventsServiceService.update(id, updateEventDto, userId, userRole);
  }

  @Post(":id/publish")
  publishEvent(
    @Param("id", ParseUUIDPipe) id: string,
    @Headers("x-user-id") userId: string,
    @Headers("x-user-role") userRole: string,
  ) {
    return this.eventsServiceService.publlishEvent(id, userId, userRole);
  }

  @Post(":id/cancel")
  cancelEvent(
    @Param("id", ParseUUIDPipe) id: string,
    @Headers("x-user-id") userId: string,
    @Headers("x-user-role") userRole: string,
  ) {
    return this.eventsServiceService.cancelEvent(id, userId, userRole);
  }

}
