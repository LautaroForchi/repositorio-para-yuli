import { Module } from '@nestjs/common';
import { authControllers } from './auth.controller';
import { authService } from './auth.service';
import { usersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [authControllers],
    providers: [authService,usersRepository],
})
export class AuthModule {}