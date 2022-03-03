import { Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService {
  getLib(output: string): string {
    return `${output}!`;
  }
}
