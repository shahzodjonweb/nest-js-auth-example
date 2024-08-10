import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    // Optionally, send a confirmation email here
    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const resetToken = await this.userService.generatePasswordResetToken(email);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      to: email,
      from: 'your-email@gmail.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://localhost:3000/reset-password/${resetToken}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    await this.userService.resetPassword(resetToken, newPassword);
  }

  async sendEmailConfirmation(email: string): Promise<void> {
    const confirmationToken =
      await this.userService.generateEmailConfirmationToken(email);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
    const mailOptions = {
      to: email,
      from: 'your-email@gmail.com',
      subject: 'Email Confirmation',
      text: `Please click on the following link to confirm your email:\n\n
             http://localhost:3000/auth/confirm-email/${confirmationToken}\n\n
             If you did not register, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    await this.userService.confirmEmail(confirmationToken);
  }
}
