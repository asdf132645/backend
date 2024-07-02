import { Controller, Get } from '@nestjs/common';
import { QualityCheckService } from './qualityCheck.service';

@Controller('qualityCheck')
export class QualityCheckController {
  constructor(private readonly qualityCheckService: QualityCheckService) {}

  @Get('execute')
  async executeApplication() {
    try {
      const result = await this.qualityCheckService.executeApplication();
      return { message: 'Application executed successfully', result };
    } catch (error) {
      return { message: 'Failed to execute application', error };
    }
  }
}
