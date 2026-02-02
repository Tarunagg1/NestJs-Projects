import { Body, Controller, Get, Headers, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createEvent(
        @Body() data: object,
        @Request() req: { user: { userId: string, role?: string } },
    ) {
        console.log(req.user);

        return this.eventsService.createEvent(data, req.user.userId, req.user.role || 'USER');
    }

    @Get()
    findAll() {
        return this.eventsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-events')
    findMyEvents(@Request() req: { user: { userId: string } }) {
        return this.eventsService.findMyEvents(req.user.userId);
    }

    @Get(':id')
    findOneEvent(@Param('id', ParseUUIDPipe) id: string) {
        return this.eventsService.findOneEvent(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateEvent(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: object,
        @Request() req: { user: { userId: string, role?: string } },
    ) {
        return this.eventsService.updateEvent(id, data, req.user.userId, req.user.role || 'USER');
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/publish')
    publishEvent(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: { user: { userId: string, role?: string } },
    ) {
        return this.eventsService.publishEvent(id, req.user.userId, req.user.role || 'USER');
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/cancel')
    cancelEvent(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: { user: { userId: string, role?: string } },
    ) {
        return this.eventsService.cancelEvent(id, req.user.userId, req.user.role || 'USER');
    }
}
