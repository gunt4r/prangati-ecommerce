import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from 'src/models/password-reset-token.entity';
import { User } from 'src/models/User.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken, User])],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, MailService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
