import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [BrandService, PrismaService],
   exports: [BrandService], 
})
export class BrandModule {}
