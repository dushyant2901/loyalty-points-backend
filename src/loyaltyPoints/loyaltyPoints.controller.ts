import { Controller, Post, Body, UseGuards, Request, Param ,Get,BadRequestException} from '@nestjs/common';
import { LoyaltyPointsService } from './loyaltyPoints.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/loyalty')
export class LoyaltyPointsController {
  constructor(private loyaltyPointsService: LoyaltyPointsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('define')
  async defineLoyaltyPoints(
    @Request() req,
    @Body() body: { pointName: string; symbol: string; totalSupply: number; additionalFeatures?: string },
  ) {
    const userId = req.user.userId; 
    return this.loyaltyPointsService.defineLoyaltyPoints(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('issue')
  async issueLoyaltyPoints(
    @Body() body: { brandRepId: string; brandId: number; loyaltyPointId: number },
  ) {
    return this.loyaltyPointsService.issueLoyaltyPoints(body);
  }


 @Get('manage')
 async getLoyaltyPoints(@Request() req) {
    const brandRepId = req.user.userId; 
    return this.loyaltyPointsService.getLoyaltyPointsByRepId(brandRepId);
  } 

 @Post('distribute')
 async distributePoints(
    @Body()
    body: {
      brandRepId: string;
      loyaltyPointId: number;
      recipientAddress: string;
      amount: number;
    },
  ) {
    const { brandRepId, loyaltyPointId, recipientAddress, amount } = body;

    if (!brandRepId || !loyaltyPointId || !recipientAddress || !amount) {
      throw new BadRequestException('All fields are required');
    }

    return this.loyaltyPointsService.distributePoints(
      brandRepId,
      loyaltyPointId,
      recipientAddress,
      amount,
    );
  }

}
