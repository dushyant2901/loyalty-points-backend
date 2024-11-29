import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  // Create or update a brand profile
  async createOrUpdateBrand(data: { name: string; logo: string }) {
    // Use findFirst if name is not unique
    const existingBrand = await this.prisma.brand.findFirst({
      where: { name: data.name },
    });

    if (existingBrand) {
      // Update the existing brand profile
      return await this.prisma.brand.update({
        where: { id: existingBrand.id }, // Use existing brand's ID for update
        data,
      });
    } else {
      // Create a new brand profile
      return await this.prisma.brand.create({
        data,
      });
    }
  }
}
