import { Injectable } from '@nestjs/common';
import * as hl7 from 'simple-hl7';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class HL7Service {
  parseHL7Message(data: Buffer): any {
    const parser = new hl7.Parser();
    return parser.parse(data.toString('utf8'));
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
    customData: any,
    pidData: any, // PID 데이터 매개변수 추가
  ) {
    // MSH 세그먼트 생성
    const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\r`;

    const segments = [mshSegment];
    let seq = 1; // 결과의 시퀀스 번호

    // PID 세그먼트 추가
    if (pidData) {
      const pidSegment = `PID|||${pidData.patientId}||${pidData.patientName}||||||||||||||||||||\r`;
      segments.push(pidSegment);
    }

    // 사용자 정의 데이터 (customData)를 Z-segment로 추가
    const { crcContent, crcRemark, crcComment, crcRecommendation } = customData;

    // CRC Content 필드 추가 (예: plt, rbc 등)
    if (crcContent) {
      // plt 항목 처리
      if (crcContent.plt) {
        crcContent.plt.forEach((item) => {
          const zSegment = `ZCR|${seq++}|plt|${item.crcTitle}|${item.crcContent}\r`;
          segments.push(zSegment);
        });
      }

      // rbc 항목 처리
      if (crcContent.rbc) {
        crcContent.rbc.forEach((item) => {
          const zSegment = `ZCR|${seq++}|rbc|${item.crcTitle}|${item.crcContent}\r`;
          segments.push(zSegment);
        });
      }

      // wbc 항목 처리
      if (crcContent.wbc) {
        crcContent.wbc.forEach((item) => {
          const zSegment = `ZCR|${seq++}|wbc|${item.crcTitle}|${item.crcContent}\r`;
          segments.push(zSegment);
        });
      }
    }

    // CRC Remark 필드 추가
    if (crcRemark && Array.isArray(crcRemark)) {
      crcRemark.forEach((remark) => {
        if (remark.remarkAllContent) {
          const zRemarkSegment = `ZRM|${seq++}|${remark.remarkAllContent}\r`;
          segments.push(zRemarkSegment);
        }
      });
    }

    // CRC comment 필드 추가
    if (crcComment && Array.isArray(crcComment)) {
      crcComment.forEach((comment) => {
        if (comment.remarkAllContent) {
          const zRemarkSegment = `ZCM|${seq++}|${comment.remarkAllContent}\r`;
          segments.push(zRemarkSegment);
        }
      });
    }

    // CRC Recommendation 필드 추가
    if (crcRecommendation && Array.isArray(crcRecommendation)) {
      crcRecommendation.forEach((recommendation) => {
        if (recommendation.remarkAllContent) {
          const zRecSegment = `ZRC|${seq++}|${recommendation.remarkAllContent}\r`;
          segments.push(zRecSegment);
        }
      });
    }

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
    rbcInfo: any[],
    result: any[],
    rbcFfiltering: any[],
    pidData: any, // PID 데이터 매개변수 추가
  ): string {
    // MSH 세그먼트 생성
    const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\r`;

    const segments = [mshSegment];
    let seq = 0;
    // PID 세그먼트 추가
    if (pidData) {
      const pidSegment = `PID|||${pidData.patientId}||${pidData.patientName}||||||||||||||||||||\r`;
      segments.push(pidSegment);
    }
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

    if (rbcFfiltering === undefined) {
      return '';
    }
    rbcFfiltering.forEach((lisCode) => {
      if (lisCode.LIS_CD !== '') {
        rbcInfo.forEach((rbcItem) => {
          if (rbcItem.categoryNm === lisCode.CATEGORY_NM) {
            rbcItem.classInfo.forEach((item) => {
              if (
                item.classId === lisCode.IA_CLASS_CD &&
                (Number(item.percent) > 0 || Number(item.degree) > 0)
              ) {
                const obxSegmentCount = `OBX|${seq++}|NM|${lisCode.LIS_CD}||${item.degree}|||N|||P\r`;
                const obxSegmentPercent = `OBX|${seq++}|NM|${lisCode.LIS_CD}%||${item.percent}|%|N|||P\r`;
                segments.push(obxSegmentCount, obxSegmentPercent);
              }
            });
          }
        });
      }
    });

    return segments.join('');
  }

  generateHL7MessageNoAbnormalFlags(
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
    const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\n`;

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
            const obxSegmentCount = `OBX|${seq++}|NM|${lisCode.LIS_CD}||${wbcItem.count}||||||P\n`;
            const obxSegmentPercent = `OBX|${seq++}|NM|${lisCode.LIS_CD}%||${wbcItem.percent}|%|||||P\n`;
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
