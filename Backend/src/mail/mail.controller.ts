import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { NewsletterDto } from '../dto/newsletter.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly mailService: MailService) {}
  @Get()
  getMail() {
    return 'You got email';
  }
  @Post()
  subscribe(@Body() newsletterDto: NewsletterDto) {
    return this.mailService.subscribe(newsletterDto);
  }
  @Post('send')
  async sendEmail(@Body() newsletterDto: NewsletterDto) {
    const { email, subject, body } = newsletterDto;
    try {
      const result = await this.mailService.sendEmail(email, subject, body);
      return result;
    } catch {
      throw new Error('Failed to send email');
    }
  }
}
