import { Injectable } from '@nestjs/common';
import * as hl7 from 'simple-hl7';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class HL7Service {
  parseHL7Message(data: Buffer): any {
    const parser = new hl7.Parser({ segmentSeperator: '\n' });
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
    const msg = new hl7.Message(
      sendingApp, // sending application
      sendingFacility, // sending facility
      receivingApp, // receiving application
      receivingFacility, // receiving facility
      dateTime, // date/time of message
      '', // security
      messageType, // message type
      messageControlId, // message control ID
      processingId, // Processing ID
      hl7VersionId, // HL7 version ID
    );

    let seq = 0;

    result.forEach((lisCode) => {
      if (lisCode.LIS_CD !== '') {
        wbcInfo.forEach((wbcItem) => {
          if (
            wbcItem.id === lisCode.IA_CD &&
            (Number(wbcItem.percent) > 0 || Number(wbcItem.count))
          ) {
            msg.addSegment(
              'OBX', // ID
              seq++, // sequence
              'NM', // value type
              lisCode.LIS_CD, // observation identifier
              '', // observation Sub-ID
              wbcItem.count, // observation Value
              '', // units
              '', // references range
              '', // abnormal flags
              '', // probability
              '', // nature of abnormal test
              'P\n', // observation result status
            );

            // percent
            msg.addSegment(
              'OBX', // ID
              seq++, // sequence
              'NM', // value type
              lisCode.LIS_CD + '%', // observation identifier
              '', // observation Sub-ID
              wbcItem.percent, // observation Value
              '%', // units
              '', // references range
              '', // abnormal flags
              '', // probability
              '', // nature of abnormal test
              'P\n', // observation result status
            );
          }
        });
      }
    });

    return msg.toString();
  }

  async sendHl7Message(filepath: string, msg: string): Promise<void> {
    const directory = path.dirname(filepath);

    return new Promise((resolve, reject) => {
      fs.mkdir(directory, { recursive: true }, (err) => {
        if (err) {
          return reject('Failed to create directory');
        }

        fs.writeFile(filepath, msg, (err) => {
          if (err) {
            return reject('Failed to write HL7 message to file');
          }

          resolve();
        });
      });
    });
  }
}
