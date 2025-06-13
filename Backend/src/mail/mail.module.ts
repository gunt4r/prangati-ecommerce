import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from './mail.service';
import { Newsletter } from 'src/models/Newsletter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Newsletter])],
  providers: [MailService, JwtService],
  exports: [MailService],
})
export class MailModule {}
