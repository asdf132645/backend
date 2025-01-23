import { Injectable } from '@nestjs/common';
import * as htmlToRtf from 'html-to-rtf';

@Injectable()
export class RTFService {
  convertHTMLToRTF(data: any): any {
    try {
      let rtf = htmlToRtf.convertHtmlToRtf(data);

      if (!rtf.includes('\\ansicpg')) {
        rtf = rtf.replace('{\\rtf1', '{\\rtf1\\ansi\\ansicpg949');
      }

      rtf = rtf.replaceAll('\\line', '\\par');
      return rtf;
    } catch (error) {
      console.error('RTF 변환 오류', error);
      return;
    }
  }
}
