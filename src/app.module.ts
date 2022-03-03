import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import {
  logger,
  LoggerMiddleware,
} from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MyLoggerModule } from '@app/my-logger';

@Module({
  imports: [CatsModule, MyLoggerModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      //.forRoutes('cats');
      .forRoutes(
        { path: 'cats', method: RequestMethod.GET },
        { path: '/cats/:id', method: RequestMethod.GET },
      );
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats/:id', method: RequestMethod.PUT },
        { path: 'cats', method: RequestMethod.POST },
      )
      .forRoutes(CatsController);
    consumer.apply(logger).forRoutes(CatsController);
  }
}
