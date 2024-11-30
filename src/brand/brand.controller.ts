import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @UseGuards(JwtAuthGuard)
  @Post('setup')
  async setupBrand(
    @Request() req,
    @Body() body: { brandName: string; description: string; otherDetails?: string },
  ) {
    const userId = req.user.userId; 
    return this.brandService.setupBrand(userId, body);
  }
}
