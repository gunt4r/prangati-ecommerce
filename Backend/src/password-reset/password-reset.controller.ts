import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { MailService } from 'src/mail/mail.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly mailService: MailService,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    await this.passwordResetService.sendPasswordResetEmail(email);
    return { message: 'Password reset link has been sent to your email' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }
    await this.passwordResetService.resetPassword(token, newPassword);
    return { message: 'Password has been successfully reset' };
  }
}
