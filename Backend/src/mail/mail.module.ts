// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
// import { join } from 'path';

@Module({
  // imports: [
  //   MailerModule.forRoot({
  //     transport: {
  //       host: 'localhost:3000',
  //       secure: false,
  //       auth: {
  //         user: 'vladprangati2005@gmail.com',
  //         pass: `${process.env.APP_PASSWORD_GMAIL}`,
  //       },
  //     },
  //     defaults: {
  //       from: '"No Reply" <noreply@gmail.com>',
  //     },
  //     template: {
  //       dir: join(__dirname, 'templates'),
  //       adapter: new HandlebarsAdapter(),
  //       options: {
  //         strict: true,
  //       },
  //     },
  //   }),
  // ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
