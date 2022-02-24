import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  //@Redirect('http://localhost:3000', 301)
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params);
    return `This action returns a #${params.id} cat`;
  }
}
