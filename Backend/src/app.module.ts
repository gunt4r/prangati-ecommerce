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
import { ThrottlerModule } from '@nestjs/throttler';
import { WishlistService } from './wishlist/wishlist.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { WishlistController } from './wishlist/wishlist.controller';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule,
    MailModule,
    ContactsModule,
    AuthModule,
    RecentlyViewedModule,
    PasswordResetModule,
    WishlistModule,
    ProductModule,
    AdminModule,
    CategoriesModule,
  ],
  controllers: [AppController, NewsletterController, ContactsController],
  providers: [AppService, MailService, ContactsService, TypeOrmConfigService],
})
export class AppModule {}
