export type RpcErrorCode = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'INTERNAL';


export type RpcErrorPayload = {
    code: RpcErrorCode;
    message: string;
    details?: any;
}




