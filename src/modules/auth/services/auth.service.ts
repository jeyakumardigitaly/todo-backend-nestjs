import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.usersService.create(dto);
    return {
      message: 'User Registered Successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalied Email or Password');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalied Email or Password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role:user.role
    };

    // const accessToken = await this.jwtService.signAsync(payload);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow<string>('auth.database.jwt_secret'),
      expiresIn: this.config.getOrThrow<string>('auth.database.jwt_expires_in') as any,
    });
    
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow<string>('auth.database.jwt_refresh_secret'),
      expiresIn: this.config.getOrThrow<string>('auth.database.jwt_refresh_expires_in') as any,
    });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async refreshToken(refreshToken:string){
    try{
        const payload = await this.jwtService.verifyAsync(
                  refreshToken,
                  {
                  secret:this.config.getOrThrow<string>('auth.database.jwt_refresh_secret')
                  }
                );
        
        const accessToken = await this.jwtService.signAsync(
            {
                sub:payload.sub,
                email:payload.email
            },
            {
                secret:this.config.getOrThrow<string>('auth.database.jwt_secret'),
                expiresIn:this.config.getOrThrow<string>('auth.database.jwt_expires_in') as any
            }
        )

        return accessToken
        
    }catch{
        throw new UnauthorizedException("Invalied Refresh Token")
    }
  }
}
