import { Controller, Get, Query,Post,UnauthorizedException,Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getUserProfile(@Query('brandRepId') brandRepId: string) {
    return this.userService.getUserProfile(brandRepId);
  }
  
   @Post('logout')
  async logout(
    @Body() body: { brandRepId: string; token: string },
  ) {
    const { brandRepId, token } = body;

    // Validate input
    if (!brandRepId || !token) {
      throw new UnauthorizedException('brandRepId and token are required');
    }

    return this.userService.logout(brandRepId, token);
  }
}
