import { Controller, Get } from '@nestjs/common';
import { PrivacyService } from './privacy.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('privacy')
@Controller('privacy')
export class PrivacyController {
  constructor(private readonly privacyService: PrivacyService) {}
  @Get('')
  displayPrivacy() {
    return this.privacyService.displayPrivacy();
  }
}
