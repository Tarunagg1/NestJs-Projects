
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { RpcErrorPayload } from './rpc.types';

@Catch()
export class RpcAllExceptionsFilter extends BaseRpcExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        if (exception instanceof RpcException) {
            return super.catch(exception, host);
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const response = exception.getResponse();
            const details = typeof response === 'string' ? { message: response } : response;

            const payload: RpcErrorPayload = {
                code: status === 400 ? 'BAD_REQUEST' : 'INTERNAL',
                message: exception.message || (status === 400 ? 'Bad Request' : 'Internal Server Error'),
                details,
            };

            return super.catch(new RpcException(payload), host);
        }

        const rawDetails = exception?.details;
        const details =
            rawDetails && typeof rawDetails === 'object'
                ? { message: rawDetails?.message }
                : rawDetails;

        const payload: RpcErrorPayload = {
            code: 'INTERNAL',
            message: exception.message || 'Internal Server Error',
            details,
        };

        return super.catch(new RpcException(payload), host);
    }
}