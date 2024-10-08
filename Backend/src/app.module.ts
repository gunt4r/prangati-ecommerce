/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail/mail.service';
@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: 'localhost:3000', // Your SMTP host
      port: 3000,
      auth: {
        user: 'vladprangati2005@gmail.com',
        pass: `${process.env.APP_PASSWORD_GMAIL}`,
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
  }),],
  controllers: [AppController,UserController],
  providers: [AppService,MailService],
})
export class AppModule {}
