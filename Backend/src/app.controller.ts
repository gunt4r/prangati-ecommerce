/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail/mail.service'; 

@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {} 

  @Get('send-mail')
  async sendMail() {
    const user = { email: 'vladprangati737@gmail.com' };
    await this.mailService.sendUserConfirmation(user);
    return 'Email sent successfully';
  }
}
