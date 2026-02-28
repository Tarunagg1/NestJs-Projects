import { RpcException } from "@nestjs/microservices";
import { RpcErrorPayload } from "./rpc.types";

export function rpcBadRequest(message: string, details?: any): never {
    const payload: RpcErrorPayload = {
        code: 'BAD_REQUEST',
        message,
        details,
    };
    throw new RpcException(payload);
}



export function rpcNotFoundRequest(message: string, details?: any): never {
    const payload: RpcErrorPayload = {
        code: 'NOT_FOUND',
        message,
        details,
    };
    throw new RpcException(payload);
}

export const rpcInternalError = (message: string, details?: any): never => {
    const payload: RpcErrorPayload = {
        code: 'INTERNAL',
        message,
        details,
    };
    throw new RpcException(payload);
}



export const rpcUnauthorized = (message: string, details?: any): never => {
    const payload: RpcErrorPayload = {
        code: 'UNAUTHORIZED',
        message,
        details,
    };
    throw new RpcException(payload);
}


export const rpcForbidden = (message: string, details?: any): never => {
    const payload: RpcErrorPayload = {
        code: 'FORBIDDEN',
        message,
        details,
    };
    throw new RpcException(payload);
}

export const rpcValidationError = (message: string, details?: any): never => {
    const payload: RpcErrorPayload = {
        code: 'VALIDATION_ERROR',
        message,
        details,
    };
    throw new RpcException(payload);
}