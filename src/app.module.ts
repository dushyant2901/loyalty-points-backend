import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { PrismaService } from './prisma.service';
import { LoyaltyPointsModule } from './loyaltyPoints/loyaltyPoints.module'; 
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule,BrandModule,LoyaltyPointsModule,UserModule],
   controllers: [AppController], 
  providers: [PrismaService],
})
export class AppModule {}




