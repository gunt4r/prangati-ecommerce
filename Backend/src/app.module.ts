import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsletterController } from './mail/mail.controller';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsService } from './contacts/contacts.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { RecentlyViewedModule } from './recently-viewed/recently-viewed.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { UploadImagesModule } from './upload-images/upload-images.module';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';
import { GenerateModule } from './countries/generate/countries.module';
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
    OrderModule,
    MailModule,
    GenerateModule,
  ],
  controllers: [AppController, NewsletterController, ContactsController],
  providers: [AppService, ContactsService, TypeOrmConfigService],
})
export class AppModule {}
