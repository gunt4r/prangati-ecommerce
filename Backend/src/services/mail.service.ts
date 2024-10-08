/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export interface User {
    email: string;
    name: string;
  }

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Thanks for subscribing to our newsletter',
      template: './confirmation', 
    });
  }
}
