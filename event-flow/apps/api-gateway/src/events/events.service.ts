import { EventResponse, SERVICE_PORTS } from "@app/common";
import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class EventsService {
    private readonly eventServiceURL = `http://localhost:${SERVICE_PORTS.EVENTS_SERVICE}/events`;


    constructor(
        private readonly httpService: HttpService
    ) { }

    async createEvent(data: object, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<EventResponse>(
                `${this.eventServiceURL}`,
                data,
                {
                    headers: {
                        'x-user-id': userId,
                        'x-user-role': userRole
                    }
                }
            ))
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    async findAll(): Promise<EventResponse[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventResponse[]>(`${this.eventServiceURL}`))
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    async findMyEvents(userId: string): Promise<EventResponse[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventResponse[]>(
                `${this.eventServiceURL}/my-events`,
                {
                    headers: {
                        'x-user-id': userId
                    }
                }
            ))
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    async findOneEvent(id: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventResponse>(
                `${this.eventServiceURL}/${id}`
            ))
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    async updateEvent(id: string, data: object, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.put<EventResponse>(
                `${this.eventServiceURL}/${id}`,
                data,
                {
                    headers: {
                        'x-user-id': userId,
                        'x-user-role': userRole
                    }
                }
            ))
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    async publishEvent(id: string, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<EventResponse>(
                `${this.eventServiceURL}/${id}/publish`,
                {},
                {
                    headers: {
                        'x-user-id': userId,
                        'x-user-role': userRole
                    }
                }
            ))
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    async cancelEvent(id: string, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<EventResponse>(
                `${this.eventServiceURL}/${id}/cancel`,
                {},
                {
                    headers: {
                        'x-user-id': userId,
                        'x-user-role': userRole
                    }
                }
            ))
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    private handelError(error: any): never {
        if (error.message) {
            throw new HttpException(error.response.data.message, error.response.status);
        }
        throw new HttpException('Something went wrong', 500);
    }
}