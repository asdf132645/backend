import { Injectable } from '@nestjs/common';
import * as htmlToRtf from 'html-to-rtf';

@Injectable()
export class RTFService {
  convertHTMLToRTF(data: any): any {
    try {
      return htmlToRtf.convertHtmlToRtf(data);
    } catch (error) {
      console.error('RTF 변환 오류', error);
      return;
    }
  }
}
