// src/jsonReader/jsonReader.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class JsonReaderService {
  async readJsonFile(fullPath: string): Promise<any> {
    try {
      const fileContent = await fs.readJson(fullPath);
      return fileContent;
    } catch (error) {
      return 'not file';
    }
  }

  async createJson(file: any, filePath: string): Promise<any> {
    try {
      // 파일 데이터 추출
      const { buffer } = file;
      const jsonData = JSON.parse(buffer.toString());

      // JSON 파일 생성
      fs.writeFileSync(filePath, JSON.stringify(jsonData));

      // 성공 응답 반환
      return {
        success: true,
        message: 'JSON 데이터가 성공적으로 생성되었습니다.',
        filePath: filePath,
      };
    } catch (error) {
      // 오류 응답 반환
      return {
        success: false,
        message: 'JSON 데이터 생성 중 오류가 발생했습니다.',
        error,
      };
    }
  }
}
