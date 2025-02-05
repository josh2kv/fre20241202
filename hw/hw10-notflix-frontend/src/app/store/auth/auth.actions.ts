import { createAction, props } from '@ngrx/store';
import { ProfileFormValues } from '@shared/interfaces/account';
import {
  CredentialFormValues,
  SignupValues,
  User,
} from '@shared/interfaces/auth';

export const setAuthState = createAction(
  '[Auth] Set Auth State',
  props<{ user: User; accessToken: string; refreshToken: string }>()
);

export const clearAuthState = createAction('[Auth] Clear Auth State');

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: CredentialFormValues }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; accessToken: string; refreshToken: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ signUpFormValues: SignupValues }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; accessToken: string; refreshToken: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[Auth] Update Profile',
  props<{ profileFormValues: ProfileFormValues }>()
);

export const updateProfileSuccess = createAction(
  '[Auth] Update Profile Success',
  props<{ user: User }>()
);

export const updateProfileFailure = createAction(
  '[Auth] Update Profile Failure',
  props<{ error: string }>()
);
