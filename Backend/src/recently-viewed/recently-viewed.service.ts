// src/recently-viewed/recently-viewed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewedProducts } from '../models/ViewedProducts.entity';
import { UploadImagesService } from 'src/upload-images/upload-images.service';
import { Product } from 'src/models/Product.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class RecentlyViewedService {
  constructor(
    @InjectRepository(ViewedProducts)
    private readonly viewedProductsRepository: Repository<ViewedProducts>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly uploadImagesService: UploadImagesService,
    private readonly productService: ProductService,
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
        relations: ['category', 'images'],
      });
      if (product) {
        (product as any).hasAttributes =
          await this.productService.productHasAttributes(product.id);
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
