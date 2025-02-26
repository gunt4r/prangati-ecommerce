import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/Product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/models/Category.entity';
import { ProductImage } from 'src/models/Product_Images.entity';
import { ProductColor } from 'src/models/Product_Colors.entity';
import { ProductSize } from 'src/models/Product_Sizes.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const {
      name,
      description,
      price,
      categoryId,
      images,
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
      !images ||
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

    if (images.length === 0 || colors.length === 0 || sizes.length === 0) {
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

    const product = this.productRepository.create({
      ...createProductDto,
      category,
    });

    return this.productRepository.save(product);
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: `${id}` },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async findLimit(limitProducts: number) {
    const products = await this.productRepository.find({
      take: limitProducts,
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
    product.images = updateProductDto.images.map((imageDto) => {
      const image = new ProductImage();
      image.url = imageDto.url;
      return image;
    });
    product.colors = updateProductDto.colors.map((colorDto) => {
      const color = new ProductColor();
      color.color = colorDto.color;
      return color;
    });
    product.sizes = updateProductDto.sizes.map((sizeDto) => {
      const size = new ProductSize();
      size.size = sizeDto.size;
      return size;
    });
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
}
