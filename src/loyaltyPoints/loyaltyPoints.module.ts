import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { LoyaltyPointsService } from './loyaltyPoints.service';
import { LoyaltyPointsController } from './loyaltyPoints.controller';
import { JwtModule } from '@nestjs/jwt'; 

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [LoyaltyPointsController],
  providers: [LoyaltyPointsService, PrismaService],
})
export class LoyaltyPointsModule {}
