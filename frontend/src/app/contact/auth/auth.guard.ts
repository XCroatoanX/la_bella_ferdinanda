import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from "../../services/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  return !!tokenService.isValid();
};
