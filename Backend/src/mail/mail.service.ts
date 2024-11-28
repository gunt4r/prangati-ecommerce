import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
  private transporter;
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.MAIL_USER}`,
        pass: `${process.env.MAIL_APP_PASSWORD}`,
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
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

  async sendResetPasswordLink(email: string, token: string) {
    const url = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;
    const text = `Hi,\nTo reset your password, click here: ${url}`;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Reset Password',
      text,
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
