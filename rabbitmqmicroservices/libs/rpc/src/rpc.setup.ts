import { INestMicroservice, ValidationPipe } from "@nestjs/common";
import { RpcAllExceptionsFilter } from "./rpc-exception.filter";

export function applyToMicroServiceLayer(app: INestMicroservice) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    )

    app.useGlobalFilters(new RpcAllExceptionsFilter())
}