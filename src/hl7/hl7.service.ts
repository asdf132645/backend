import { Injectable } from '@nestjs/common';
import * as hl7 from 'simple-hl7';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class HL7Service {
  parseHL7Message(data: Buffer): any {
    const parser = new hl7.Parser();
    return parser.parse(data.toString());
  }

  generateHL7MessageWithCustomData(
    sendingApp: string,
    sendingFacility: string,
    receivingApp: string,
    receivingFacility: string,
    dateTime: string,
    messageType: string[],
    messageControlId: string,
    processingId: string,
    hl7VersionId: string,
    wbcInfo: any[],
    result: any[],
    customData: any[],
  ) {
    // MSH 세그먼트 생성
    const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\r`;

    const segments = [mshSegment];
    let seq = 1; // 결과의 시퀀스 번호

    // 기본 결과(OBX) 세그먼트 생성
    if (result) {
      result.forEach((lisCode) => {
        if (lisCode.LIS_CD !== '') {
          wbcInfo.forEach((wbcItem) => {
            if (
              Number(wbcItem.id) === Number(lisCode.IA_CD) &&
              (Number(wbcItem.percent) > 0 || Number(wbcItem.count))
            ) {
              const obxSegmentCount = `OBX|${seq++}|NM|${lisCode.LIS_CD}||${wbcItem.count}|||N|||P\r`;
              const obxSegmentPercent = `OBX|${seq++}|NM|${lisCode.LIS_CD}%||${wbcItem.percent}|%|N|||P\r`;
              segments.push(obxSegmentCount, obxSegmentPercent);
            }
          });
        }
      });
    }

    // 사용자 정의 데이터 (customData)를 Z-segment로 추가
    customData.forEach((dataItem) => {
      const { crcContent, crcRemark, crcRecommendation } = dataItem;

      // CRC Content 필드 추가 (예: WBC, RBC 등)
      if (crcContent) {
        Object.keys(crcContent).forEach((key) => {
          const items = crcContent[key];
          items.forEach((item) => {
            const zSegment = `ZCR|${seq++}|${key}|${item.crcTitle}|${item.crcContent}\r`;
            segments.push(zSegment);
          });
        });
      }

      // CRC Remark 필드 추가
      if (crcRemark) {
        crcRemark.forEach((remark) => {
          const zRemarkSegment = `ZRM|${seq++}|${remark.code}|${remark.remarkAllContent}\r`;
          segments.push(zRemarkSegment);
        });
      }

      // CRC Recommendation 필드 추가
      if (crcRecommendation) {
        crcRecommendation.forEach((recommendation) => {
          const zRecSegment = `ZRC|${seq++}|${recommendation.code}|${recommendation.remarkAllContent}\r`;
          segments.push(zRecSegment);
        });
      }
    });

    return segments.join('');
  }

  generateHL7Message(
    sendingApp: string,
    sendingFacility: string,
    receivingApp: string,
    receivingFacility: string,
    dateTime: string,
    messageType: string[],
    messageControlId: string,
    processingId: string,
    hl7VersionId: string,
    wbcInfo: any[],
    result: any[],
  ): string {
    // MSH 세그먼트 생성
    const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\r`;

    const segments = [mshSegment];
    let seq = 0;

    if (result === undefined) {
      return '';
    }
    result.forEach((lisCode) => {
      if (lisCode.LIS_CD !== '') {
        wbcInfo.forEach((wbcItem) => {
          if (
            Number(wbcItem.id) === Number(lisCode.IA_CD) &&
            (Number(wbcItem.percent) > 0 || Number(wbcItem.count))
          ) {
            const obxSegmentCount = `OBX|${seq++}|NM|${lisCode.LIS_CD}||${wbcItem.count}|||N|||P\r`;
            const obxSegmentPercent = `OBX|${seq++}|NM|${lisCode.LIS_CD}%||${wbcItem.percent}|%|N|||P\r`;
            segments.push(obxSegmentCount, obxSegmentPercent);
          }
        });
      }
    });

    return segments.join('');
  }

  async sendHl7Message(filepath: string, msg: any): Promise<void> {
    const directory = path.dirname(filepath);

    return new Promise((resolve, reject) => {
      fs.mkdir(directory, { recursive: true }, (err) => {
        if (err) {
          console.error('Failed to create directory:', err.message);
          return reject(`Failed to create directory: ${err.message}`);
        }

        // 한글이 깨지지 않도록 utf8 인코딩을 명시적으로 설정
        fs.writeFile(filepath, msg.data, { encoding: 'utf8' }, (err) => {
          if (err) {
            console.error('Failed to write HL7 message to file:', err.message);
            return reject(
              `Failed to write HL7 message to file: ${err.message}`,
            );
          }

          resolve();
        });
      });
    });
  }
}
