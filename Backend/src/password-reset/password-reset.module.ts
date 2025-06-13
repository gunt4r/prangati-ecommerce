import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetToken } from 'src/models/password-reset-token.entity';
import { User } from 'src/models/User.entity';
import { MailService } from 'src/mail/mail.service';
import { Newsletter } from 'src/models/Newsletter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken, User, Newsletter])],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, MailService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
