import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register user
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const registrationResponse = await this.authService.register(body.email, body.password);
    return {
     
      brandRepId: registrationResponse.brandRepId,
      access_token: registrationResponse.access_token,  
    };
  }

  // Login user and generate JWT token
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const jwtResponse = await this.authService.generateJwt(user);
    return {
      brandRepId: jwtResponse.brandRepId,
      access_token: jwtResponse.access_token, 
    };
  }
}

