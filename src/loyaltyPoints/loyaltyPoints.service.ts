import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LoyaltyPointsService {
  constructor(private prisma: PrismaService) {}

  
  async defineLoyaltyPoints(userId: string, data: { pointName: string; symbol: string; totalSupply: number; additionalFeatures?: string }) {
    try {
      // Check if the user is associated with a brand
      const brand = await this.prisma.brand.findFirst({
        where: { brandRepId: userId },
      });

      if (!brand) {
        throw new Error('User is not associated with any brand');
      }

      // Check if loyalty points with the same symbol already exist for this brand
      const existingPoints = await this.prisma.loyaltyPoints.findFirst({
        where: { brandId: brand.id, symbol: data.symbol },
      });

      if (existingPoints) {
        throw new Error('Loyalty points with this symbol already exist for your brand');
      }

      // Create new loyalty points
      const newPoints = await this.prisma.loyaltyPoints.create({
        data: {
          brandRepId: userId,
          brandId: brand.id,
          pointName: data.pointName,
          symbol: data.symbol,
          totalSupply: data.totalSupply,
          additionalFeatures: data.additionalFeatures,
        },
      });

      return {
        loyaltyPointId: newPoints.loyaltyPointId,
        status: 'created',
      };
    } catch (error) {
      console.error('Error defining loyalty points:', error);
      throw new Error('Failed to define loyalty points');
    }
  }

  
   async issueLoyaltyPoints(data: { brandRepId: string; brandId: number; loyaltyPointId: number }) {
    try {
      const { brandRepId, brandId, loyaltyPointId } = data;

    
      const brand = await this.prisma.brand.findFirst({
        where: { id: brandId, brandRepId },
      });

      if (!brand) {
        throw new Error('Brand not found or not managed by this user');
      }

     
      const loyaltyPoints = await this.prisma.loyaltyPoints.findFirst({
        where: { loyaltyPointId, brandId, brandRepId },
      });

      if (!loyaltyPoints) {
        throw new Error('Loyalty points entry not found for this brand');
      }


      return {
        loyaltyPointId: loyaltyPoints.loyaltyPointId,
        status: 'issued',
      };
    } catch (error) {
      console.error('Error issuing loyalty points:', error);
      throw new Error('Failed to issue loyalty points');
    }
  }

async getLoyaltyPointsByRepId(brandRepId: string) {
    return this.prisma.loyaltyPoints.findMany({
      where: {
        brandRepId, 
      },
    });
  }

async distributePoints(
    brandRepId: string,
    loyaltyPointId: number,
    recipientAddress: string,
    amount: number,
  ) {
    const loyaltyPoint = await this.prisma.loyaltyPoints.findFirst({
      where: {
        loyaltyPointId,
        brandRepId,
      },
    });

    if (!loyaltyPoint) {
      throw new BadRequestException('Invalid loyaltyPointId or brandRepId');
    }

    
    if (loyaltyPoint.totalSupply < amount) {
      throw new BadRequestException('Insufficient points available');
    }

  
    const distribution = await this.prisma.loyaltyPointsDistribution.create({
      data: {
        loyaltyPointId,
        recipientAddress,
        amount,
      },
    });

    
    await this.prisma.loyaltyPoints.update({
      where: { loyaltyPointId },
      data: {
        totalSupply: loyaltyPoint.totalSupply - amount,
      },
    });

 
    return {
      distributionId: distribution.id,
      status: 'success',
    };
  }

}
