import {
  Controller,
  Get,
  MethodNotAllowedException,
  Res,
} from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get()
  sendMailer(@Res() response: any) {
    try {
      const mail = this.emailService.sendMail();
      return response.status(200).json({
        message: 'success',
        mail,
      });
    } catch (error) {
      throw new MethodNotAllowedException(error);
    }
  }
}
