import { Controller, Post, Body } from '@nestjs/common';
import { HL7Service } from './hl7.service';

@Controller('hl7')
export class HL7Controller {
  constructor(private readonly hl7Service: HL7Service) {}

  @Post('parse')
  async parseHL7Message(@Body() data: Buffer): Promise<any> {
    return this.hl7Service.parseHL7Message(data);
  }

  @Post('message')
  createHL7Message(@Body() requestBody: any): string {
    // 필요한 데이터를 모두 requestBody로부터 추출하여 generateHL7Message 메서드에 전달합니다.
    const hl7Message = this.hl7Service.generateHL7Message(
      requestBody.sendingApp,
      requestBody.sendingFacility,
      requestBody.receivingApp,
      requestBody.receivingFacility,
      requestBody.dateTime,
      requestBody.messageType,
      requestBody.messageControlId,
      requestBody.processingId,
      requestBody.hl7VersionId,
      requestBody.wbcInfo,
      requestBody.result,
    );
    return hl7Message;
  }

  @Post('hl7Create')
  async sendHl7Message(@Body() body: { filepath: string; msg: string }) {
    const { filepath, msg } = body;

    try {
      await this.hl7Service.sendHl7Message(filepath, msg);
      return { message: 'HL7 message sent successfully' };
    } catch (error) {
      return { error: error };
    }
  }
}
