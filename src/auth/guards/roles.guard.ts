import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Verify if the endpoint has the Public decorator
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    // Get the roles from the endpoint
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new UnauthorizedException(
        'Can not access to this resource, wrong rol',
      );
    }
    return true;
  }
}
