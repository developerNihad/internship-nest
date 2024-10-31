import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { User } from "src/entities/User.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async findOne(where: FindOptionsWhere<User>): Promise<User | undefined> {
        return this.userRepo.findOne({ where });
    }

    async create(params: Partial<User>) {
        const existingUser = await this.userRepo.findOne({ where: { email: params.email } });
        if (existingUser) {
            throw new ConflictException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(params.password, 10);
        const user = this.userRepo.create({ ...params, password: hashedPassword });
        return await this.userRepo.save(user);
    }

}