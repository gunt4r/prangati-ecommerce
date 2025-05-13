// src/recently-viewed/recently-viewed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewedProducts } from '../models/ViewedProducts.entity';
import { UploadImagesService } from 'src/upload-images/upload-images.service';
import { Product } from 'src/models/Product.entity';

@Injectable()
export class RecentlyViewedService {
  constructor(
    @InjectRepository(ViewedProducts)
    private readonly viewedProductsRepository: Repository<ViewedProducts>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly uploadImagesService: UploadImagesService,
  ) {}

  async addOrUpdateViewedProduct(
    userUuid: string,
    productId: string,
  ): Promise<ViewedProducts> {
    const existingProduct = await this.viewedProductsRepository.findOne({
      where: { userUuid, productId },
    });

    if (existingProduct) {
      await this.viewedProductsRepository.delete(existingProduct.id);
    }

    const viewedProduct = this.viewedProductsRepository.create({
      userUuid,
      productId,
    });
    return this.viewedProductsRepository.save(viewedProduct);
  }

  async getRecentViewedProducts(
    userUuid: string,
    limit: number = 3,
  ): Promise<Product[]> {
    const returnedProducts = this.viewedProductsRepository.find({
      where: { userUuid },
      order: { viewedAt: 'DESC' },
      take: limit,
    });
    const products: Product[] = [];

    for (const productViewed of await returnedProducts) {
      const product = await this.productRepository.findOne({
        where: { id: productViewed.productId },
        relations: ['category'],
      });
      if (product) {
        const images = await this.uploadImagesService.imageRepository.find({
          where: { entityType: 'product', entityId: productViewed.productId },
          take: 1,
        });
        (product as any).images = images;
        products.push(product);
      }
    }
    return products;
  }

  async getAll() {
    return await this.viewedProductsRepository.find();
  }
  async removeAll() {
    await this.viewedProductsRepository.query(
      `TRUNCATE viewed_products RESTART IDENTITY CASCADE;`,
    );
    return 'All viewed products are deleted';
  }
}
