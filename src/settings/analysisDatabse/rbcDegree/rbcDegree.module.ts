// src/rbcDegree/rbcDegree.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RbcDegreeController } from './rbcDegree.controller';
import { RbcDegreeService } from './rbcDegree.service';
import { RbcDegree } from './rbcDegree.entity';
import { User } from '../../../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RbcDegree, User])],
  controllers: [RbcDegreeController],
  providers: [RbcDegreeService],
})
export class RbcDegreeModule {}
