import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/models/Category.entity';
import { UploadImagesService } from 'src/upload-images/upload-images.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject(forwardRef(() => UploadImagesService))
    private readonly uploadImagesService: UploadImagesService,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    const { name, cardType } = createCategoryDto;

    const nameExists = await this.categoryRepository.findOne({
      where: { name: name },
    });
    if (nameExists) {
      throw new Error('Category name already exists');
    }
    const uploadedImage = await this.uploadImagesService.uploadFile(file);

    return this.categoryRepository.save({
      name,
      image: uploadedImage,
      cardType,
    });
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
      relations: ['image'],
    });
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['image'],
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
      relations: ['image'],
    });
    if (!category) {
      throw new Error('Category not found');
    }
    await this.categoryRepository.remove(category);
  }
  /**
   * Removes all categories from the database by truncating the table and resetting
   * identity counters. This operation is irreversible and will delete all data in the
   * categories table.
   * @returns A message indicating that all categories have been deleted.
   */

  async removeAll() {
    await this.categoryRepository.query(
      `TRUNCATE categories RESTART IDENTITY CASCADE;`,
    );
    return 'Categories are deleted';
  }
}
