import { Injectable } from '@nestjs/common';

@Injectable()
export class SseConfigService {
  readonly NOTIFICATION_OBSERVABLE_STRING = 'notification-sse';
  readonly LOCATION_OBSERVABLE_STRING = 'location-sse';
  readonly ROOMCHAT_OBSERVABLE_STRING = 'roomchat-sse';
  readonly USERDETAIL_OBSERVABLE_STRING = 'userdetail-sse';
  readonly DRIVERORDERHEADER_OBSERVABLE_STRING = 'driverorderheader-sse';
  readonly CUSTOMERORDERHEADER_OBSERVABLE_STRING = 'customerorderheader-sse';
  readonly PAYMENTHEADER_OBSERVABLE_STRING = 'paymentheader-sse';
  readonly DAILYPICKUP_OBSERVABLE_STRING = 'dailypickup-sse';
  readonly ADMINTIMEBLOCK_OBSERVABLE_STRING = 'admintimeblock-sse';
}
