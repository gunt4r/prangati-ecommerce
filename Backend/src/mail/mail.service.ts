import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';
@Injectable()
export class MailService {
  private transporter;
  private readonly logger = new Logger(MailService.name);
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.MAIL_USER}`,
        pass: `${process.env.MAIL_APP_PASSWORD}`,
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    this.logger.log('Received data:', { to, subject, body });
    const mailOptions = {
      from: `${process.env.MAIL_USER}`,
      to,
      subject,
      html: body,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
