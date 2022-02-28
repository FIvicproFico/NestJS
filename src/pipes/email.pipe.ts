import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseEmailPipe implements PipeTransform<string> {
  transform(value: string): string {
    const validateEmail = (value) => {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (value.match(validRegex)) return value;
    };
    const val = validateEmail(value);
    if (val) {
      return val;
    } else throw new BadRequestException('Not Email');
  }
}
