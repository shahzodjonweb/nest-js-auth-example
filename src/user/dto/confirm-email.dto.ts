import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
