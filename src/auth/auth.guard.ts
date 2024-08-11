import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, username } = request.body;

    const userByEmail = await this.userService.findByEmail(email);
    const userByUsername = await this.userService.findByUsername(username);

    if (userByEmail || userByUsername) {
      throw new UnauthorizedException(
        'User with the given email or username already exists',
      );
    }

    return true;
  }
}
