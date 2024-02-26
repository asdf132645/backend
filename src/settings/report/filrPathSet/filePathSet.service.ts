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
    const { userId, filePathSetItems } = createDto as CreateFilePathSetDto;
    const createdItems: FilePathSetEntity[] = [];
    for (const item of filePathSetItems) {
      const imagePrintEntity = this.filePathSetEntityRepository.create({
        ...item,
        userId,
      });
      const createdItem =
        await this.filePathSetEntityRepository.save(imagePrintEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: CreateFilePathSetDto,
  ): Promise<FilePathSetEntity[]> {
    const { filePathSetItems } = updateDto;

    const updatedItems: FilePathSetEntity[] = [];
    for (const item of filePathSetItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(
    userId: number,
    item: any,
  ): Promise<FilePathSetEntity> {
    const existingFilePathSet = await this.filePathSetEntityRepository.findOne({
      where: { userId, id: item.id },
    });

    if (existingFilePathSet) {
      await this.filePathSetEntityRepository.update(
        existingFilePathSet.id,
        item,
      );
      return await this.filePathSetEntityRepository.findOne({
        where: { userId, id: item.id },
      });
    }

    return null;
  }

  async findByUserId(userId: number): Promise<FilePathSetEntity[]> {
    return await this.filePathSetEntityRepository.find({ where: { userId } });
  }
}
