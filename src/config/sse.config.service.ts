import { Injectable } from '@nestjs/common';

@Injectable()
export class SseConfigService {
  readonly NOTIFICATION_OBSERVABLE_STRING = 'notification-sse';
  readonly LOCATION_OBSERVABLE_STRING = 'location-sse';
  readonly ROOMCHAT_OBSERVABLE_STRING = 'roomchat-sse';
  readonly USERDETAIL_OBSERVABLE_STRING = 'userdetail-sse';
}
