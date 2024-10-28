import { ApiHideProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, Validate, validate } from 'class-validator';
import { MatchPassword } from 'src/decorators/marchPassword.decorator';

export class CreateUserDto {

    /**
     * Debe ser un mail valido
     * @example 'soyLautaro@yahoo.com'
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * Debe ser un nombre entre 3 y 80 caracteres
     * @example 'pepe argento'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    /**
     * debe ser un string que incluya al menos una mayuscula, un simbolo, una minuscula y un numero
     * @example 'aaAA$$11'
     */
    @IsStrongPassword()
    @IsString()
    password: string;
    
    /**
     * debe coincidir con el password
     * @example 'aaAA$$11'
     */
    @IsNotEmpty()
    @Validate(MatchPassword,['password'])
    confirmPassword: string;
    

    /**
     * debe ser un string entre 5 y 80 caracteres
     * @example 'avenida siempre viva'
     */
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(80)
    address?: string;

    /**
     * debe ser un numero
     * @example '11252512'
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * debe ser un string entre 5 y 20 caracres
     * @example 'test country'
     */
    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    country?: string;
    /**
     * debe ser un string entre 5 y 20 caracres
     * @example 'test city'
     */
    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    city?: string;


    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean;
}


export class LoginUserDTO extends PickType(CreateUserDto,['email','password']){}