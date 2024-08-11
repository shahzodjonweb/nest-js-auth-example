import {
  Body,
  Controller,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserExistsGuard } from './auth.guard';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ForgotPasswordDto } from '../user/dto/forgot-password.dto';
import { ResetPasswordDto } from '../user/dto/reset-password.dto';
import { ConfirmEmailDto } from '../user/dto/confirm-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(UserExistsGuard)
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('forgot-password')
  @UsePipes(ValidationPipe)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.sendPasswordResetEmail(forgotPasswordDto);
    return {
      message: 'Password reset email sent',
      status: 200,
    };
  }

  @Post('reset-password/:token')
  @UsePipes(ValidationPipe)
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(token, resetPasswordDto);
  }

  @Post('send-confirmation')
  async sendConfirmation(@Body() confirmEmailDto: ConfirmEmailDto) {
    await this.authService.sendEmailConfirmation(confirmEmailDto);
  }

  @Post('confirm-email/:token')
  async confirmEmail(@Param('token') token: string) {
    await this.authService.confirmEmail(token);
  }
}
