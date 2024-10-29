/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { NewsletterController } from './mail/mail.controller';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsService } from './contacts/contacts.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule,
    MailModule,
    ContactsModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    NewsletterController,
    ContactsController,
  ],
  providers: [AppService, MailService, ContactsService, TypeOrmConfigService],
})
export class AppModule {
  constructor(private readonly typeOrmConfigService: TypeOrmConfigService) {
    const dataSource = this.typeOrmConfigService.createDataSource();
    dataSource
      .initialize()
      .then(() => {
        console.log('Database connected successfully');
      })
      .catch((error) => console.log(error));
  }
}
