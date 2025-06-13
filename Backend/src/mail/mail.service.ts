import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Newsletter } from 'src/models/Newsletter.entity';
import { NewsletterDto } from 'src/dto/newsletter.dto';
@Injectable()
export class MailService {
  private transporter: any;
  /**
   * MailService constructor
   *
   * @param {ConfigService} configService NestJS ConfigService
   * @param {Repository<Newsletter>} newsletterRepository Repository for Newsletter entity
   */
  private readonly logger = new Logger(MailService.name);
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Newsletter)
    private readonly newsletterRepository: Repository<Newsletter>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.MAIL_USER}`,
        pass: `${process.env.MAIL_APP_PASSWORD}`,
      },
    });
  }

  async subscribe(newsletterDto: NewsletterDto) {
    const { email } = newsletterDto;
    try {
      this.isEmailInNewsletter(email);
      return { status: 200 };
    } catch (error) {
      this.logger.error('Error subscribing to newsletter:', error);
      throw new Error('Failed to subscribe to newsletter');
    }
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

  async isEmailInNewsletter(email: string): Promise<Newsletter | null> {
    try {
      const newsletter = await this.newsletterRepository.findOneBy({ email });
      if (!newsletter) {
        const newNewsletter = this.newsletterRepository.create({ email });
        await this.newsletterRepository.save(newNewsletter);
        return newNewsletter;
      }
      return newsletter;
    } catch (error) {
      throw new Error(`Failed to check if email is in newsletter ${error}`);
    }
  }
}
