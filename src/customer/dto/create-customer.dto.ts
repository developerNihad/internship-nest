import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contactPerson: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber(null)
    phone: string;
}