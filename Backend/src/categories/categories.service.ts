import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/models/Category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const nameExists = await this.categoryRepository.findOneBy({ name });
    if (nameExists) {
      throw new Error('Category name already exists');
    }
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    const { name } = updateCategoryDto;

    const nameExists = await this.categoryRepository.findOne({
      where: { name: name },
    });
    if (nameExists) {
      throw new Error('Category name already exists');
    }

    category.name = name;
    await this.categoryRepository.save(category);
    return `Category updated successfully. Name = ${name}`;
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    await this.categoryRepository.remove(category);
  }
}
