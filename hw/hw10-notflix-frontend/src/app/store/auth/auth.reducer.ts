import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(
    AuthActions.setAuthState,
    (state, { user, accessToken, refreshToken }) => ({
      ...state,
      user,
      accessToken,
      refreshToken,
    })
  ),
  on(AuthActions.clearAuthState, (state) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
  })),
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user, accessToken, refreshToken }) => {
    return {
      ...state,
      user,
      accessToken,
      refreshToken,
      loading: false,
      error: null,
    };
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    AuthActions.registerSuccess,
    (state, { user, accessToken, refreshToken }) => ({
      ...state,
      user,
      accessToken,
      refreshToken,
      loading: false,
      error: null,
    })
  ),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.updateProfile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.updateProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
