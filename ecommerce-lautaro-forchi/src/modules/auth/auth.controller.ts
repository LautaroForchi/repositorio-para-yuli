import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { authService } from "./auth.service";
import { SignInDto } from "./auth.dto";
import { CreateUserDto, LoginUserDTO } from "../users/users.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')   // aca defninmos el que en el url va a ser /auth
export class authControllers{
    constructor (private readonly authService: authService ){}/*crea una propiedad privada dentro de esta clase que voy a poder utilizar dentro de otros metodos*/
    
    @Post('singup')
    async signUp(@Body() user: CreateUserDto){
        return this.authService.signup(user);
    }
    
    @Post('signin')
    @HttpCode(HttpStatus.OK) // Devuelve el estado HTTP 200 en caso de éxito
    @UsePipes(new ValidationPipe()) // Validar el DTO
    async signIn(@Body() signInDto: LoginUserDTO) {
        const {email, password} = signInDto
        return this.authService.signIn(email, password);
    }
}