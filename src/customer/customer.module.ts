import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/entities/Customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer]),
        AuthModule,
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}