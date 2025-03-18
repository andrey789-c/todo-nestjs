import { Body, Injectable, NotFoundException, Res, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SignUserDto } from './dto/sing-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entity/auth.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(@Body() dto: SignUserDto) {

    if (!dto.username || !dto.password) {
      throw new UnauthorizedException({
        username: 'Введите логин и пароль',
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if(!user) {
      throw new NotFoundException('Пользователь не найден')
    }
    if (await bcrypt.compare(dto.password, user.password)) {
      const { password, ...result } = user;
      
      return {
        ...result,
        access_token: this.jwtService.sign(result),
      };
    } else {
      throw new UnauthorizedException({
        message: 'Неверный логин или пароль',
      });
    }
  }

  async register(dto: SignUserDto) {  
    const isRegister = await this.prisma.user.findUnique({
      where: { username: dto.username },
    })

    if (isRegister) {
      throw new UnprocessableEntityException({
        message: 'Пользователь с таким именем уже существует',
      });
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashPassword,
      },
    });

    const { password, ...result } = user;
    return {
      ...result,
      access_token: this.jwtService.sign(result),
    };
  }

  async getProfile(id: number) {
    const user = await this.prisma.user.findUnique({where: {id}})

    if(!user) throw new UnauthorizedException('Пользователь не найден, авториуйтесь!')

    return {
      id: user?.id,
      username: user?.username,
    }
  }

  logout(@Res() response: Response) {
    response.clearCookie('access_token');

    return response.status(200).json({ message: 'Вы вышли из аккаунта' });
  }
}
