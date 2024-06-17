import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagePrintEntity } from './imagePrint.entity';
import { CreateImagePrintDto } from './dto/imgaePrintDto';

@Injectable()
export class ImagePrintService {
  // 변경된 부분
  constructor(
    @InjectRepository(ImagePrintEntity)
    private readonly imagePrintEntityRepository: Repository<ImagePrintEntity>,
  ) {}

  async create(createDto: CreateImagePrintDto): Promise<ImagePrintEntity> {
    const { imagePrintItems } = createDto as CreateImagePrintDto;
    const createdItems: ImagePrintEntity[] = [];
    for (const item of imagePrintItems) {
      const imagePrintEntity = this.imagePrintEntityRepository.create({ ...item });
      const createdItem =
        await this.imagePrintEntityRepository.save(imagePrintEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(updateDto: CreateImagePrintDto): Promise<ImagePrintEntity[]> {
    const { imagePrintItems } = updateDto;
    const updatedItems: ImagePrintEntity[] = [];
    for (const item of imagePrintItems) {
      const updatedItem = await this.updateItem(item);
      updatedItems.push(updatedItem);
    }
    return updatedItems;
  }

  private async updateItem(item: any): Promise<ImagePrintEntity> {
    const existingBfHotKeys = await this.imagePrintEntityRepository.findOne({
      where: { id: item.id },
    });

    if (existingBfHotKeys) {
      await this.imagePrintEntityRepository.update(existingBfHotKeys.id, item);
      return await this.imagePrintEntityRepository.findOne({
        where: { id: item.id },
      });
    }

    return null;
  }

  async find(): Promise<ImagePrintEntity[]> {
    return await this.imagePrintEntityRepository.find();
  }
}
