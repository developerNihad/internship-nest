import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import config from '../config/config';

@Module({
  imports: [
      UserModule,
      JwtModule.register({
          secret: config.jwtSecret,
          signOptions: { expiresIn: '60m' },
      }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}