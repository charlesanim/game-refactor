import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthPartialState, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthPartialState, AuthState>(
  AUTH_FEATURE_KEY
);

export const getLoginSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.loginResponse
);

export const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);

export const getSearchGameSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.searchResponse
);
export const getPlatforms = createSelector(
  getAuthState,
  (state: AuthState) => state.platforms
);
export const getGameDetails = createSelector(
  getAuthState,
  (state: AuthState) => state.gameDetails
);
export const getCollection = createSelector(
  getAuthState,
  (state: AuthState) => state.collection
);
export const addToCollectionSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.addToCollectionSuccess
);
export const removeGameSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.removeGameSuccess
);

// Errors

export const getLoginError = createSelector(
  getAuthState,
  (state: AuthState) => state.loginError
);
export const getSearchGameError = createSelector(
  getAuthState,
  (state: AuthState) => state.searchGameError
);
export const getFetchPlatformsError = createSelector(
  getAuthState,
  (state: AuthState) => state.fetchPlatformsError
);
export const getFetchCollectionError = createSelector(
  getAuthState,
  (state: AuthState) => state.fetchCollectionError
);
export const getFetchGameDetailsError = createSelector(
  getAuthState,
  (state: AuthState) => state.fetchGameDetailsError
);
export const getAddToCollectionError = createSelector(
  getAuthState,
  (state: AuthState) => state.addToCollectionError
);
export const getRemoveGameError = createSelector(
  getAuthState,
  (state: AuthState) => state.removeGameError
);

export const authQuery = {
  getLoading,
  getLoginSuccess,
  addToCollectionSuccess,
  getSearchGameSuccess,
  getPlatforms,
  getGameDetails,
  getCollection,
  removeGameSuccess,
  getLoginError,
  getSearchGameError,
  getFetchPlatformsError,
  getFetchCollectionError,
  getFetchGameDetailsError,
  getAddToCollectionError,
  getRemoveGameError,
};
