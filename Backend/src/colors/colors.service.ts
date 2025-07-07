import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ProductColor } from 'src/models/Product_Colors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(ProductColor)
    private readonly colorRepository: Repository<ProductColor>,
  ) {}

  create(createColorDto: CreateColorDto) {
    try {
      const { name, hexCode } = createColorDto;

      const color = this.colorRepository.create({ name, hexCode });
      return this.colorRepository.save(color);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const colors = await this.colorRepository.find();
      if (!colors) {
        throw new NotFoundException('Colors not found');
      }
      return colors;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const color = await this.colorRepository.findOne({ where: { id: id } });

      if (!color) {
        throw new NotFoundException('Color not found');
      }
      return color;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    try {
      const { name, hexCode } = updateColorDto;
      const color = await this.findOne(id);
      color.name = name;
      color.hexCode = hexCode;
      return this.colorRepository.save(color);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const color = await this.findOne(id);
      return this.colorRepository.remove(color);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeAll() {
    const colors = await this.colorRepository.find();
    return this.colorRepository.remove(colors);
  }
}
