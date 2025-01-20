import { Injectable } from '@nestjs/common';
import * as htmlToRtf from 'html-to-rtf';

@Injectable()
export class RTFService {
  convertHTMLToRTF(data: { data: HTMLElement }): any {
    try {
      const rtfContent = htmlToRtf.convertHtmlToRtf(data);
      return rtfContent;
    } catch (error) {
      console.error('RTF 변환 오류', error);
      return;
    }
  }
}
