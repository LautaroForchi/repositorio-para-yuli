import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, Validate, validate } from 'class-validator';
import { MatchPassword } from 'src/decorators/marchPassword.decorator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsStrongPassword()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @Validate(MatchPassword,['password'])
    confirmPassword: string;
    
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(80)
    address?: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    country?: string;

    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    city?: string;
}


export class LoginUserDTO extends PickType(CreateUserDto,['email','password']){}