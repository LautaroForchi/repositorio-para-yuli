import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { usersRepository } from './users.repository';
import { Users } from './users.interface';
import { CreateUserDto } from './users.dto';
import { UpdateUserDto } from './users.dtoopcional';



@Injectable()
export class usersService {
    
    
  
  constructor(private usersRepository: usersRepository){}
  
  
  getUsers(page: number, limit: number): any {
    return this.usersRepository.getUsers(page,limit);
  }
  
  async getUsersById(id: string) {
    return this.usersRepository.getUsersById(id);
  }
  
  async postUsers(user: any) {
    return this.usersRepository.postUsers(user);
}

  
  
async putUsers(id: string, user: any) {
  return this.usersRepository.putUser(id, user);
}



async deleteUsers(id: string) {
  return this.usersRepository.deleteUser(id);
}

  

  
}