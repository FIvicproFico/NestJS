import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { LoggingService } from 'src/logger/logging.service';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { GetCatParamsDto } from './dto/get-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private loggingService: LoggingService,
  ) {}

  // @Get()
  // findAllExpress(@Res({ passthrough: true }) res: Response): string {
  //   res.status(HttpStatus.ACCEPTED);
  //   return 'This action returns all cats';
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    this.loggingService.logToConsole('This action returns all cats');
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: GetCatParamsDto): string {
    this.loggingService.logToConsole(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<void> {
    console.log(createCatDto);
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    this.loggingService.logToConsole(id);
    return `This action updates name of #${id} cat to ${updateCatDto.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    this.loggingService.logToConsole(id);
    return `This action removes a #${id} cat`;
  }
}
