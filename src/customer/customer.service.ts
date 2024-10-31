import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "src/entities/Customer.entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>,
    ) {}

    async create(customerData: CreateCustomerDto): Promise<Customer> {
        const customer = this.customerRepo.create(customerData);
        return await this.customerRepo.save(customer);
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerRepo.find();
    }
}