import { SERVICE_PORTS } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { first, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {

    private readonly authServiceURL = `http://localhost:${SERVICE_PORTS.AUTH_SERVICE}`;

    constructor(
        private readonly httpService: HttpService
    ) { }

    async register(email: string, password: string, name: string) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.authServiceURL}/register`, {
                    email,
                    password,
                    name
                })
            );
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.authServiceURL}/login`, {
                    email,
                    password
                })
            );
            return response.data;
        } catch (error) {
            this.handelError(error);
        }
    }


    async getProfile(token: string) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.authServiceURL}/profile`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
            );
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
