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
  async sendEmailForgotPassword(to: string, token: string) {
    const resetUrl = `https://your-app-url.com/password-reset?token=${token}`;
    const mailOptions = {
      from: `Prangati shop ${process.env.MAIL_USER}`,
      to,
      subject: 'Password Reset Request',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p style="margin-top: 20px;">This link will expire in 15 minutes.</p>
      </div>
    `,
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
