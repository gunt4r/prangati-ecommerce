import { Module } from '@nestjs/common';
import { GenerateService } from './countries.service';
import { GenerateController } from './countries.controller';

@Module({
  controllers: [GenerateController],
  providers: [GenerateService],
})
export class GenerateModule {}
