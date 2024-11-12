// src/app.module.ts
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
import { RecentlyViewedModule } from './recently-viewed/recently-viewed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetModule } from './password-reset/password-reset.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule,
    MailModule,
    ContactsModule,
    AuthModule,
    RecentlyViewedModule,
    PasswordResetModule,
  ],
  controllers: [AppController, NewsletterController, ContactsController],
  providers: [AppService, MailService, ContactsService, TypeOrmConfigService],
})
export class AppModule {}
