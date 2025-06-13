import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/models/Product.entity';
import { Category } from 'src/models/Category.entity';
import { ProductColor } from 'src/models/Product_Colors.entity';
import { ProductSize } from 'src/models/Product_Sizes.entity';
import { UploadImagesService } from 'src/upload-images/upload-images.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly uploadService: UploadImagesService,
    @InjectRepository(ProductColor)
    private readonly colorRepository: Repository<ProductColor>,
    @InjectRepository(ProductSize)
    private readonly sizeRepository: Repository<ProductSize>,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const {
      name,
      description,
      price,
      categoryId,
      colors,
      sizes,
      stock,
      rating,
    } = createProductDto;

    if (
      !name ||
      !description ||
      !price ||
      !categoryId ||
      !colors ||
      !sizes ||
      !stock
    ) {
      throw new Error('Missing required fields');
    }

    const anotherProduct = await this.productRepository.findOne({
      where: { name },
    });
    if (anotherProduct) {
      throw new Error('Product already exists');
    }

    if (colors.length === 0 || sizes.length === 0) {
      throw new Error(
        'Images, colors and sizes must have at least one element',
      );
    }

    if (!rating) {
      createProductDto.rating = 0;
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error('Category not found');
    }

    const uploadedImages = await this.uploadService.uploadMultipleFiles(files);

    const product = this.productRepository.create({
      ...createProductDto,
      category,
    });
    const savedProduct = await this.productRepository.save(product);

    for (const img of uploadedImages) {
      img.entityType = 'product';
      img.entityId = savedProduct.id;
      await this.uploadService.imageRepository.save(img);
    }
    for (const color of createProductDto.colors) {
      const colorValue = typeof color === 'string' ? color : color.color;
      const colorEntity = this.colorRepository.create({
        color: colorValue,
        product: savedProduct.id,
      });
      await this.colorRepository.save(colorEntity);
    }
    for (const size of createProductDto.sizes) {
      const sizeValue = typeof size === 'string' ? size : size.size;
      const sizeEntity = this.sizeRepository.create({
        size: sizeValue,
        product: savedProduct.id,
      });
      await this.sizeRepository.save(sizeEntity);
    }
    return this.productRepository.save({
      ...savedProduct,
      colors: createProductDto.colors,
      sizes: createProductDto.sizes,
    });
  }

  async findAll(category?: string, limit: number = 12, page: number = 1) {
    const where: any = {};
    if (category) {
      where.category = { id: category };
    }

    const [products, total] = await this.productRepository.findAndCount({
      where,
      relations: ['category'],
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });

    for (const product of products) {
      const images = await this.uploadService.imageRepository.find({
        where: { entityType: 'product', entityId: product.id },
      });
      (product as any).images = images;
      (product as any).hasAttributes = this.productHasAttributes(product.id);
    }

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });
    if (!product) {
      throw new Error('Product not found');
    }
    const images = await this.uploadService.imageRepository.find({
      where: { entityType: 'product', entityId: id },
    });
    const colors = await this.colorRepository.find({
      where: { product: id },
    });
    const sizes = await this.sizeRepository.find({
      where: { product: id },
    });
    (product as any).hasAttributes = this.productHasAttributes(id);
    return {
      ...product,
      images,
      colors,
      sizes,
    };
  }

  async search(query: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
    });
    return products;
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id: `${id}` },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.category = await this.categoryRepository.findOne({
      where: { id: updateProductDto.categoryId },
    });

    // product.colors = updateProductDto.colors.map((colorDto) => {
    //   const color = new ProductColor();
    //   color.color = colorDto.color;
    //   return color;
    // });
    // product.sizes = updateProductDto.sizes.map((sizeDto) => {
    //   const size = new ProductSize();
    //   size.size = sizeDto.size;
    //   return size;
    // });
    product.stock = updateProductDto.stock;
    product.isFeatured = updateProductDto.isFeatured;
    product.rating = updateProductDto.rating;
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: `${id}` },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return this.productRepository.remove(product);
  }

  async productHasAttributes(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const colors = await this.colorRepository.find({
      where: { product: id },
    });
    const sizes = await this.sizeRepository.find({
      where: { product: id },
    });
    if (colors.length > 0 || sizes.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
