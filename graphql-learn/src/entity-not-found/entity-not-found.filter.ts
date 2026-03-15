import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter<T> implements GqlExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return new NotFoundException('Entity not found');
  }
}
