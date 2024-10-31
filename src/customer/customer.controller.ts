import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { ApiTags } from "@nestjs/swagger";
import { Customer } from "src/entities/Customer.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@ApiTags('Customers')
@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.create(createCustomerDto);
    }

    @Get()
    async findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }
}