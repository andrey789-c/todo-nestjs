import { IsNotEmpty, IsString } from "class-validator";


export class SignUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Введите логин' })
  username: string

  @IsString()
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string
}