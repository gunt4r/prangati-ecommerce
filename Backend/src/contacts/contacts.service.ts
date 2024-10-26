import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';
@Injectable()
export class ContactsService {
  private transporter;
  private readonly logger = new Logger(ContactsService.name);
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.MAIL_USER}`,
        pass: `${process.env.MAIL_APP_PASSWORD}`,
      },
    });
  }

  async sendEmail(
    subject: string,
    body: string,
    firstName: string,
    lastName: string,
  ) {
    this.logger.log('Received data:', { subject, body, firstName, lastName });
    const mailOptions = {
      from: `${process.env.MAIL_USER}`,
      to: `${process.env.MAIL_USER}`,
      subject: `USER CONTACT. Subject from user : ${subject}`,
      html: `User first name : ${firstName} <br />
             User last name : ${lastName} <br />
             User message is below : <br />
             ${body}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      this.logger.error('Error sending email to us:', error);
      throw new Error('Failed to send email to us');
    }
  }
}
