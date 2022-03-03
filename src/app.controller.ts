import { MyLoggerService } from '@app/my-logger/my-logger.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private myLoggerService: MyLoggerService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.myLoggerService.getLib('Hello from lib '));
    return this.appService.getHello();
  }
}
