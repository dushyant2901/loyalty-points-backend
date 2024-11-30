import { Controller, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
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
}
