import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return 'Welcome to the Loyalty Points Issuence NestJS API!';
  }
}
