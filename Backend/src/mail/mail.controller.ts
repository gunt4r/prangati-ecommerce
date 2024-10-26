import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { NewsletterDto } from '../dto/newsletter.dto';
import { Logger } from '@nestjs/common';

@Controller('newsletter')
export class NewsletterController {
  private readonly logger = new Logger(NewsletterController.name);
  constructor(private readonly mailService: MailService) {}
  @Get()
  getMail() {
    return 'You got email';
  }
  @Post('send')
  async sendNewsletter(@Body() newsletterDto: NewsletterDto) {
    const { email, subject, body } = newsletterDto;
    this.logger.log('Received data: ' + JSON.stringify(newsletterDto));
    try {
      const result = await this.mailService.sendEmail(email, subject, body);
      return result;
    } catch (error) {
      this.logger.error('Error in sendNewsletter:', error);
      throw new Error('Failed to send email');
    }
  }
}
