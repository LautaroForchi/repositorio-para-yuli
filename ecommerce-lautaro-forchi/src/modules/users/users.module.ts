import { Module } from '@nestjs/common';
import { usersControllers } from './users.controllers';
import { usersService } from './users.service';
import { usersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [usersControllers],
    providers: [usersService, usersRepository],
    exports: [usersRepository],
})
export class UsersModule {}