import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {}

  sendMail() {
    return true;
  }
}
