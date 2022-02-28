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
  // Req,
  // Res,
  // Next,
  UseGuards,
  // UseFilters,
  ValidationPipe,
} from '@nestjs/common';

// import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
// import { ValidationPipe } from 'src/pipes/validation.pipe';

import { Roles } from 'src/decorators/roles.decorator';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { RolesGuard } from 'src/guards/auth.guard';

import { LoggingService } from 'src/logger/logging.service';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(
    private catsService: CatsService,
    private loggingService: LoggingService,
  ) {}

  // @Get()
  // findAll(@Req() request: Request): string {
  //   console.log(request);
  //   return 'This action returns all cats';
  // }

  @Get()
  async findAll(@Query('query') query: string): Promise<Cat[]> {
    this.loggingService.logToConsole('This action returns all cats ' + query);
    return this.catsService.custom();
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): string {
    this.loggingService.logToConsole(id);
    return `This action returns a #${id} cat`;
  }

  @Post()
  @Roles('admin')
  async create(
    @Body(ValidationPipe) createCatDto: CreateCatDto,
  ): Promise<void> {
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
    @Body(ValidationPipe) updateCatDto: UpdateCatDto,
  ): string {
    this.loggingService.logToConsole(id);
    return `This action updates name of #${id} cat to ${updateCatDto.name} from email ${updateCatDto.email}`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string): string {
    this.loggingService.logToConsole(id);
    return `This action removes a #${id} cat`;
  }
}
