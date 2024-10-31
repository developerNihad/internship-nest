import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/entities/User.entity";
import { ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "./dto/register-user.dto";


@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        return this.userService.create(registerUserDto);
    }
}