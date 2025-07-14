import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/models/Product.entity';
import { Category } from 'src/models/Category.entity';
import { ProductColor } from 'src/models/Product_Colors.entity';
import { ProductSize } from 'src/models/Product_Sizes.entity';
import { UploadImagesService } from 'src/upload-images/upload-images.service';
import {
  paginate,
  PaginateConfig,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { AdvancedSearchDto } from './dto/product-queries.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductColor)
    private readonly colorRepository: Repository<ProductColor>,
    @InjectRepository(ProductSize)
    private readonly sizeRepository: Repository<ProductSize>,

    private readonly uploadService: UploadImagesService,
  ) {}

  private readonly paginateConfig: PaginateConfig<Product> = {
    sortableColumns: ['name', 'price', 'createdAt', 'rating', 'stock'],
    nullSort: 'last',
    defaultSortBy: [['createdAt', 'DESC']],
    searchableColumns: ['name', 'description'],
    select: [
      'id',
      'name',
      'description',
      'price',
      'stock',
      'rating',
      'isFeatured',
      'gender',
      'createdAt',
      'category.id',
      'category.name',
      'colors.id',
      'colors.name',
      'colors.hexCode',
      'sizes.id',
      'sizes.size',
      'images.id',
      'images.path',
      'images.originalName',
    ],
    relations: ['category', 'colors', 'sizes', 'images'],
    filterableColumns: {
      'category.id': true,
      'colors.id': true,
      'sizes.id': true,
      price: true,
      rating: true,
      stock: true,
      isFeatured: true,
      gender: true,
    },
    defaultLimit: 12,
    maxLimit: 100,
  };

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    try {
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
        throw new BadRequestException('Missing required fields');
      }

      const anotherProduct = await this.productRepository.findOne({
        where: { name },
      });
      if (anotherProduct) {
        throw new BadRequestException('Product already exists');
      }

      if (
        colors.length === 0 ||
        sizes.length === 0 ||
        (files && files.length === 0)
      ) {
        throw new BadRequestException(
          'Colors and sizes must have at least one element',
        );
      }

      if (!rating) {
        createProductDto.rating = 0;
      }

      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new BadRequestException('Category not found');
      }

      const colorEntities: ProductColor[] = [];
      for (const colorDto of colors) {
        console.log('colordto', colorDto);
        const color = await this.colorRepository.findOne({
          where: { id: colorDto },
        });
        if (!color) {
          throw new BadRequestException(`Color ${colorDto} not found`);
        }
        console.log(`Color ${colorDto} found`);
        colorEntities.push(color);
      }

      const sizeEntities: ProductSize[] = [];
      for (const sizeDto of sizes) {
        const size = await this.sizeRepository.findOne({
          where: { id: sizeDto },
        });
        if (!size) {
          throw new BadRequestException(`Size ${sizeDto} not found`);
        }
        console.log(`Size ${sizeDto} found`);
        sizeEntities.push(size);
      }
      console.log('sizeentities', sizeEntities);
      console.log('colorentities', colorEntities);
      const uploadedImages =
        await this.uploadService.uploadMultipleFiles(files);

      const product = this.productRepository.create({
        name,
        description,
        price,
        stock,
        rating: createProductDto.rating || 0,
        isFeatured: createProductDto.isFeatured || false,
        category,
        colors: colorEntities,
        sizes: sizeEntities,
        images: uploadedImages,
      });
      console.log('productt', product);
      return this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.images', 'images');

    return paginate(query, queryBuilder, this.paginateConfig);
  }
  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
        relations: ['category', 'colors', 'sizes', 'images'],
      });
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findWithAdvancedFilters(
    query: PaginateQuery,
    filters?: AdvancedSearchDto,
  ): Promise<any> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.images', 'images');

    if (filters) {
      if (filters.minPrice !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', {
          minPrice: filters.minPrice,
        });
      }

      if (filters.maxPrice !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', {
          maxPrice: filters.maxPrice,
        });
      }

      if (filters.colorIds && filters.colorIds.length > 0) {
        queryBuilder.andWhere('colors.id IN (:...colorIds)', {
          colorIds: filters.colorIds,
        });
      }

      if (filters.sizeIds && filters.sizeIds.length > 0) {
        queryBuilder.andWhere('sizes.id IN (:...sizeIds)', {
          sizeIds: filters.sizeIds,
        });
      }

      if (filters.categoryIds && filters.categoryIds.length > 0) {
        queryBuilder.andWhere('category.id IN (:...categoryIds)', {
          categoryIds: filters.categoryIds,
        });
      }

      if (filters.inStock === true) {
        queryBuilder.andWhere('product.stock > 0');
      }

      if (filters.featured === true) {
        queryBuilder.andWhere('product.isFeatured = true');
      }

      if (filters.minRating !== undefined) {
        queryBuilder.andWhere('product.rating >= :minRating', {
          minRating: filters.minRating,
        });
      }
      if (filters.gender) {
        queryBuilder.andWhere('product.gender IN (:...genders)', {
          genders: filters.gender,
        });
      }
    }

    const priceRange = await queryBuilder
      .clone()
      .select('MIN(product.price)', 'minPrice')
      .addSelect('MAX(product.price)', 'maxPrice')
      .getRawOne();

    const paginatedResult = await paginate(
      query,
      queryBuilder,
      this.paginateConfig,
    );
    console.log({
      ...paginatedResult,
      priceRange: {
        minPrice: Number(priceRange.minPrice),
        maxPrice: Number(priceRange.maxPrice),
      },
    });
    return {
      ...paginatedResult,
      priceRange: {
        minPrice: Number(priceRange.minPrice),
        maxPrice: Number(priceRange.maxPrice),
      },
    };
  }
  async findAllBack(category?: string, limit: number = 12, page: number = 1) {
    const where: any = {};
    if (category) {
      where.category = { id: category };
    }

    const [products, total] = await this.productRepository.findAndCount({
      where,
      relations: ['category', 'colors', 'sizes', 'images'],
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });

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
  async search(query: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
    });
    return products;
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.category = await this.categoryRepository.findOne({
      where: { id: updateProductDto.categoryId },
    });

    product.stock = updateProductDto.stock;
    product.isFeatured = updateProductDto.isFeatured;
    product.rating = updateProductDto.rating;
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return this.productRepository.remove(product);
  }

  async removeAll() {
    const products = await this.productRepository.find();
    return this.productRepository.remove(products);
  }

  async productHasAttributes(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['category', 'colors', 'sizes', 'images'],
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (product.colors.length > 0 || product.sizes.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async findProductUtils<T extends ProductColor | ProductSize>(
    optionsRepository: Repository<T>,
    productID: string,
  ): Promise<T[]> {
    try {
      const product = await this.findOne(productID);

      const options = await optionsRepository
        .createQueryBuilder('option')
        .innerJoin('option.products', 'product')
        .where('product.id = :productId', { productId: product.id })
        .getMany();

      if (!options || options.length === 0) {
        throw new NotFoundException('No options found for this product');
      }

      return options;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
