import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { usersService } from "./users.service";

import { UpdateUserDto } from "./users.dtoopcional";
//import { CreateUserDto } from "./users.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./roles.enum";
import { RolesGuard } from "../auth/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiTags('users')
@Controller('users')
export class usersControllers{
    constructor (private readonly usersService: usersService){}
    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    getUsers(
        @Query('page') page: number=1,
        @Query('limit') limit: number = 2,
    ):any{
        return this.usersService.getUsers(page, limit);
    }
    
    @Get(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async getUsersById(@Param('id') id : string){
        return this.usersService.getUsersById(id);
    }

    /*@Post()
    @HttpCode(HttpStatus.CREATED) // Establece el estado HTTP 201
    @UsePipes(new ValidationPipe({ whitelist: true })) // Agrega whitelist: true para filtrar propiedades no permitidas
    async createUser(@Body() user: CreateUserDto) {
        return this.usersService.postUsers(user);
    }*/
    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK) // Especifica el estado HTTP 200
    async putUsers(@Param('id') id: string, @Body(new ValidationPipe()) user: UpdateUserDto ) {
    return this.usersService.putUsers(id,user);
    }
    

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK) // Especifica el estado HTTP 200
    async deleteUsers(@Param('id') id: string) {
        return this.usersService.deleteUsers(id);
    }


}