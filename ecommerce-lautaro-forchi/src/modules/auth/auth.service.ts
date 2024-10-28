import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './auth.dto';
import { usersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class authService {
  constructor(
    private readonly usersRepository: usersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: Partial<Users>) {
    const { email, password } = user;
    if (!email || !password)
      throw new BadRequestException('Require email y password');
    const foundUser = await this.usersRepository.findByEmail(email);
    if (foundUser) throw new BadRequestException('registered email');
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersRepository.postUsers({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    if (!email || !password) return `email y contraseña required`;
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid Credentials');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new BadRequestException('invalid credentials');

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = this.jwtService.sign(payload);
    return { message: 'Logged-in User', token };
  }
}
