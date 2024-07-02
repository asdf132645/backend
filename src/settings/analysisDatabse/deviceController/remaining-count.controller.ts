import { Controller, Get } from '@nestjs/common';
import { RemainingCountService } from './remaining-count.service';

@Controller('remaining-count')
export class RemainingCountController {
  constructor(private readonly remainingCountService: RemainingCountService) {}

  @Get('execute')
  async executeApplication() {
    try {
      const result = await this.remainingCountService.executeApplication();
      return { message: 'Application executed successfully', result };
    } catch (error) {
      return { message: 'Failed to execute application', error };
    }
  }
}
