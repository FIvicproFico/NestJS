import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  async findAll(): Promise<string> {
    return 'This action returns all cats but async';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    console.log(updateCatDto);
    return `This action updates name of #${id} cat to ${updateCatDto.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
