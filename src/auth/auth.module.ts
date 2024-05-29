import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
@Module({
    imports: [UserModule, PassportModule, 
        JwtModule.registerAsync({
            imports: [ConfigModule.forRoot()],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
                }
            }),
            inject: [ConfigService],
         })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, ConfigService, JwtStrategy],
  })
  export class AuthModule {}