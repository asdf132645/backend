import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilePathSetEntity } from './filePathSetEntity';
import { CreateFilePathSetDto } from './dto/filePathSetDto'; // 변경된 부분

@Injectable()
export class FilePathSetService {
  // 변경된 부분
  constructor(
    @InjectRepository(FilePathSetEntity)
    private readonly filePathSetEntityRepository: Repository<FilePathSetEntity>,
  ) {}

  async create(createDto: CreateFilePathSetDto): Promise<FilePathSetEntity> {
    const { filePathSetItems } = createDto as CreateFilePathSetDto;
    const createdItems: FilePathSetEntity[] = [];
    for (const item of filePathSetItems) {
      const imagePrintEntity = this.filePathSetEntityRepository.create({ ...item });
      const createdItem = await this.filePathSetEntityRepository.save(imagePrintEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(updateDto: CreateFilePathSetDto): Promise<FilePathSetEntity[]> {
    const { filePathSetItems } = updateDto;

    const updatedItems: FilePathSetEntity[] = [];
    for (const item of filePathSetItems) {
      const updatedItem = await this.updateItem(item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(item: any): Promise<FilePathSetEntity> {
    const existingFilePathSet = await this.filePathSetEntityRepository.findOne({
      where: { id: item.id },
    });

    if (existingFilePathSet) {
      await this.filePathSetEntityRepository.update(
        existingFilePathSet.id,
        item,
      );
      return await this.filePathSetEntityRepository.findOne({
        where: { id: item.id },
      });
    }

    return null;
  }

  async find(): Promise<FilePathSetEntity[]> {
    return await this.filePathSetEntityRepository.find();
  }
}
