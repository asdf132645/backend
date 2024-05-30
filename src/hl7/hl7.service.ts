import { Injectable } from '@nestjs/common';
import * as hl7 from 'simple-hl7';

@Injectable()
export class HL7Service {
  parseHL7Message(data: Buffer): any {
    const parser = new hl7.Parser({ segmentSeperator: '\n' });
    return parser.parse(data.toString());
  }
}
