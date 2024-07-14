import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HL7Controller } from './hl7.controller';
import { HL7Service } from './hl7.service';
import { PlainTextMiddleware } from './plainTextMiddleware';

@Module({
  controllers: [HL7Controller],
  providers: [HL7Service],
})
export class Hl7Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PlainTextMiddleware).forRoutes('hl7/parse');
  }
}
