import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  logToConsole(logString: string): void {
    console.log(logString);
  }
}
