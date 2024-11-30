import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { PrismaService } from './prisma.service';
import { LoyaltyPointsModule } from './loyaltyPoints/loyaltyPoints.module'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller'; 
import { UserController } from './user/user.controller'; 
import { BrandController } from './brand/brand.controller'; 
import { LoyaltyPointsController } from './loyaltyPoints/loyaltyPoints.controller'; 

@Module({
  imports: [AuthModule,BrandModule,LoyaltyPointsModule,UserModule],
   controllers: [AppController,AuthController,BrandController,LoyaltyPointsController,UserController], 
  providers: [PrismaService,AppService],
})
export class AppModule {}




