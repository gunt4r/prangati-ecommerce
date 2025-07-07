import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSize } from 'src/models/Product_Sizes.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(ProductSize)
    private readonly sizeRepository: Repository<ProductSize>,

    private readonly productService: ProductService,
  ) {}
  create(createSizeDto: CreateSizeDto) {
    try {
      const { size } = createSizeDto;
      const newSize = this.sizeRepository.create({ size });
      return this.sizeRepository.save(newSize);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const sizes = await this.sizeRepository.find();
      if (!sizes) {
        throw new NotFoundException('Sizes not found');
      }
      return sizes;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const size = await this.sizeRepository.findOne({ where: { id: id } });

      if (!size) {
        throw new NotFoundException('Size not found');
      }
      return size;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    try {
      const { size } = updateSizeDto;

      const sizeToUpdate = await this.findOne(id);
      sizeToUpdate.size = size;
      return this.sizeRepository.save(sizeToUpdate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const size = await this.findOne(id);
      return this.sizeRepository.remove(size);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeAll() {
    try {
      const sizes = await this.sizeRepository.find();
      if (!sizes) {
        throw new NotFoundException('Sizes not found');
      }
      return await this.sizeRepository.remove(sizes);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
