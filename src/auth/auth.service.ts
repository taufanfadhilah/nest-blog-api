import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import IUser from './interfaces/user.interface';
import LoginDto from './dto/login.dto';

const saltRounds = 10;

@Injectable()
export class AuthService {
  private users: IUser[] = [];

  private getNewId() {
    const userLength = this.users.length;
    return this.users[userLength - 1]?.id + 1 || 1;
  }

  async register(registerDto: RegisterDto) {
    const user: IUser = {
      ...registerDto,
      id: this.getNewId(),
      password: await bcrypt.hash(registerDto.password, saltRounds),
      role: 'member',
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);
    return {
      ...user,
      password: undefined,
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find((user) => user.email === loginDto.email);
    if (!user) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return false;
    }

    return {
      ...user,
      password: undefined,
    };
  }
}
