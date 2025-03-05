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
import { WishlistModule } from './wishlist/wishlist.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { UploadImagesModule } from './upload-images/upload-images.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../prangati', 'public'),
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
    WishlistModule,
    ProductModule,
    AdminModule,
    CategoriesModule,
    CartModule,
    UserModule,
    UploadImagesModule,
  ],
  controllers: [AppController, NewsletterController, ContactsController],
  providers: [AppService, MailService, ContactsService, TypeOrmConfigService],
})
export class AppModule {}
