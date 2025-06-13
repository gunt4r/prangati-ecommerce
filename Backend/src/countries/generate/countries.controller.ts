import { Controller, Get, Param, Delete } from '@nestjs/common';
import { GenerateService } from './countries.service';

@Controller('countries')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Get()
  findAll() {
    return this.generateService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generateService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generateService.remove(+id);
  }
}
