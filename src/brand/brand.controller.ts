import { Controller, Post, Body } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  // Set up brand profile (create or update)
  @Post('setup')
  async createOrUpdateBrand(@Body() body: { name: string; logo: string }) {
    return await this.brandService.createOrUpdateBrand(body);
  }
}
