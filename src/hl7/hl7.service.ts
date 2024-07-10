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
        // console.log(msg.data)
        fs.writeFile(filepath, msg.data, (err) => {
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
