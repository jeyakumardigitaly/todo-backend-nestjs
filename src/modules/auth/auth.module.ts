import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./strategy/auth.strategy";
import { RolesGuard } from "./guards/roles.guard";


@Module({
    imports:[
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory:(config:ConfigService)=>({
                secret: config.getOrThrow<string>('auth.database.jwt_secret'),
            signOptions: {
                expiresIn: config.getOrThrow<string>('auth.database.jwt_expires_in') as any,
            },
            }),
        }),
    ],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy,RolesGuard],
    exports:[AuthService,PassportModule]
})

export class AuthModule{}