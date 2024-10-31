import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async register(registerUserDto: RegisterUserDto) {
        return this.userService.create(registerUserDto);
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userService.findOne({ email: loginUserDto.email });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials'); 
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}