import { Controller, Body, Post, Logger } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactDto } from 'src/dto/contact.dto';
@Controller('contacts')
export class ContactsController {
  private readonly logger = new Logger(ContactsController.name);
  constructor(private readonly contactsService: ContactsService) {}
  @Post('send')
  async sendContactForm(@Body() ContactDto: ContactDto) {
    const { subject, body, firstName, lastName } = ContactDto;
    this.logger.log(
      'Received data: ',
      subject,
      ' ',
      body,
      ' ',
      firstName,
      ' ',
      lastName,
    );
    try {
      const result = await this.contactsService.sendEmail(
        subject,
        body,
        firstName,
        lastName,
      );
      return result;
    } catch (error) {
      this.logger.error('Error: ', error);
    }
  }
}
