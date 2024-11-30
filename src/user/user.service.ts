import { Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  
  async getUserProfile(brandRepId: string) {
    
    const user = await this.prisma.user.findUnique({
      where: { id: brandRepId },
      select: {
        id: true,    
        email: true,
      },
    });

   
    if (!user) {
      throw new NotFoundException('User not found');
    }

   
    return {
      brandRepId: user.id,
      email: user.email,
    };
  }

  async logout(brandRepId: string, token: string) {
    try {
      
      const user = await this.prisma.user.findUnique({
        where: { id: brandRepId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found or invalid brandRepId');
      }

     
      return {
        status: 'success',
        message: 'User logged out successfully',
      };
    } catch (error) {
      console.error('Error during logout:', error);
      throw new UnauthorizedException('Logout failed');
    }
  }




}

