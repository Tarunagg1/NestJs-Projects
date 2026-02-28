import { rpcBadRequest, rpcInternalError, rpcNotFoundRequest } from "../rpc.helpers";

export function mapRpcErrorToHttp(err: any): never {
    const payload = err?.error || err;

    const code = payload?.code as string | undefined;

    const message = payload?.message ?? "Unknown error";

    switch (code) {
        case 'BAD_REQUEST':
            throw rpcBadRequest(message, 400);
        case 'NOT_FOUND':
            throw rpcNotFoundRequest(message, 404);
        case 'INTERNAL':
            throw rpcInternalError(message, 500);
        default:
            throw rpcInternalError(message, 500);
    }
}