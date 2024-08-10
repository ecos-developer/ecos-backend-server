import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/jwt/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('JWT Strategy: Received Payload:', payload);

    if (!payload) {
      console.log('JWT Strategy: No payload found');
      throw new UnauthorizedException('Invalid token');
    }

    // Returning the payload
    const user = {
      user_id: payload.user_id,
      email: payload.email,
      role: payload.role,
    };
    return user;
  }
}
