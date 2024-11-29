import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule,BrandModule],
  providers: [PrismaService],
})
export class AppModule {}




