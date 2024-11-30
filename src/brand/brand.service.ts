import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  // Create or update a brand profile
  async setupBrand(
    brandRepId: string, 
    data: { brandName: string; description: string; otherDetails?: string }
  ) {
    const existingBrand = await this.prisma.brand.findFirst({
      where: { brandRepId },
    });

    if (existingBrand) {
      // Update the existing brand profile
      await this.prisma.brand.update({
        where: { id: existingBrand.id },
        data: {
          brandName: data.brandName,
          description: data.description,
          otherDetails: data.otherDetails,
        },
      });

      return {
        brandId: existingBrand.id, 
        status: 'updated', 
      };
    } else {
      // Create a new brand profile if none exists
      const newBrand = await this.prisma.brand.create({
        data: {
          brandRepId, 
          brandName: data.brandName,
          description: data.description,
          otherDetails: data.otherDetails,
        },
      });

      return {
        brandId: newBrand.id, 
        status: 'created', 
      };
    }
  }
}

