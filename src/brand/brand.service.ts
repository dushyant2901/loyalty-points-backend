import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  
  async setupBrand(userId: string, data: { brandName: string; description: string; otherDetails?: string }) {
    try {
    
      const existingBrand = await this.prisma.brand.findFirst({
        where: { brandRepId: userId },
      });

      if (existingBrand) {
      
        const updatedBrand = await this.prisma.brand.update({
          where: { id: existingBrand.id },
          data: {
            brandName: data.brandName,
            description: data.description,
            otherDetails: data.otherDetails,
          },
        });

        return {
          brandId: updatedBrand.id,
          status: 'updated',
        };
      } else {
       
        const newBrand = await this.prisma.brand.create({
          data: {
            brandRepId: userId,
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
    } catch (error) {
      console.error('Error setting up brand:', error);
      throw new Error('Failed to setup brand');
    }
  }
}
