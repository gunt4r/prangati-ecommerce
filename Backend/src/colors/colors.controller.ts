import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(id, updateColorDto);
  }

  @Delete('remove-all')
  removeAll() {
    return this.colorsService.removeAll();
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(id);
  }
}
