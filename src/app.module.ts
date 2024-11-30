import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { PrismaService } from './prisma.service';
import { LoyaltyPointsModule } from './loyaltyPoints/loyaltyPoints.module'; 
@Module({
  imports: [AuthModule,BrandModule,LoyaltyPointsModule],
  providers: [PrismaService],
})
export class AppModule {}




