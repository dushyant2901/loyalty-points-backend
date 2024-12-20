import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}


  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(pass, user.password)) {
      return { id: user.id, email: user.email }; 
    }
    return null;
  }

  
  async register(email: string, pass: string) {
    const hashedPassword = bcrypt.hashSync(pass, 10);
    
  
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });


    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });

   
    return {
      brandRepId: user.id,  
      access_token: accessToken, 
    };
  }

  
  async generateJwt(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };


    return {
      access_token: this.jwtService.sign(payload),
      brandRepId: user.id,  
    };
  }
}
