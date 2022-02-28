import {
  Body,
  Controller,
  Delete,
  Get,
  // ForbiddenException
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';

import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

import { ForbiddenException } from 'src/exceptions/forbidden.exception';

import { LoggingService } from 'src/logger/logging.service';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
// controller-scoped
//@UseFilters(HttpExceptionFilter)
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
  async findAll(@Query('query') query: string): Promise<Cat[]> {
    this.loggingService.logToConsole('This action returns all cats ' + query);
    return this.catsService.findAll();
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException();
  }

  // @Get()
  // findOne(@Query('id', ParseIntPipe) id: string): string {
  //   this.loggingService.logToConsole(id);
  //   return `This action returns a #${id} cat`;
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): string {
    this.loggingService.logToConsole(id);
    return `This action returns a #${id} cat`;
  }

  @Post()
  // Prefer applying filters by using classes instead of instances when possible. It reduces memory usage since Nest can easily reuse instances of the same class across your entire module.
  // method-scoped
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto): Promise<void> {
    console.log(createCatDto);
    try {
      return this.catsService.create(createCatDto);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): string {
    this.loggingService.logToConsole(id);
    return `This action updates name of #${id} cat to ${updateCatDto.name}`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string): string {
    this.loggingService.logToConsole(id);
    return `This action removes a #${id} cat`;
  }
}
