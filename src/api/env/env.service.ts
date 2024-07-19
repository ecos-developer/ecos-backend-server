import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService {
  getConfigValues() {
    return {
      IMAGE_SERVER_ENDPOINT: process.env.IMAGE_SERVER_ENDPOINT,
    };
  }
}
