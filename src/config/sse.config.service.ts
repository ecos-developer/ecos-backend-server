import { Injectable } from '@nestjs/common';

@Injectable()
export class SseConfigService {
  readonly NOTIFICATION_OBSERVABLE_STRING = 'notification.sse.';
}
