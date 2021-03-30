/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on, Action } from '@ngrx/store';
import {
  Collection,
  GameDetails,
  LoginResponse,
  Platforms,
  SearchRequest,
  SearchResponse,
} from '../shared/data-models';
import {
  addToCollection,
  addToCollectionError,
  addToCollectionSuccess,
  fetchCollection,
  fetchCollectionError,
  fetchCollectionSuccess,
  fetchGameDetails,
  fetchGameDetailsError,
  fetchGameDetailsSuccess,
  fetchPlatforms,
  fetchPlatformsError,
  fetchPlatformsSuccess,
  login,
  loginError,
  loginSuccess,
  removeGame,
  removeGameError,
  removeGameSuccess,
  resetState,
  searchGame,
  searchGameError,
  searchGameSuccess,
} from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  loginResponse: LoginResponse | null;
  loading: boolean;
  searchRequest: SearchRequest | null;
  searchResponse: SearchResponse[];
  platforms: Platforms[];
  collection: Collection[];
  gameDetails: GameDetails[];
  addToCollectionSuccess: boolean;
  removeGameSuccess: boolean;
  //Errors
  searchGameError: HttpErrorResponse | null;
  fetchPlatformsError: HttpErrorResponse | null;
  fetchCollectionError: HttpErrorResponse | null;
  fetchGameDetailsError: HttpErrorResponse | null;
  addToCollectionError: HttpErrorResponse | null;
  removeGameError: HttpErrorResponse | null;
  loginError: HttpErrorResponse | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  loginResponse: null,
  loading: false,
  searchRequest: null,
  searchResponse: [],
  platforms: [],
  collection: [],
  gameDetails: [],
  addToCollectionSuccess: false,
  removeGameSuccess: false,
  //Errors
  searchGameError: null,
  fetchPlatformsError: null,
  fetchCollectionError: null,
  fetchGameDetailsError: null,
  addToCollectionError: null,
  removeGameError: null,
  loginError: null,
};

const authReducer = createReducer(
  initialState,
  on(login, (state, { loginRequest }) => ({
    ...state,
    loginRequest,
    loading: true,
    loginError: null,
  })),
  on(loginSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
    loading: false,
    loginError: null,
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    loginError: error,
    loading: false,
  })),
  on(searchGame, (state, { searchRequest }) => ({
    ...state,
    searchRequest: null,
    loading: true,
    searchGameError: null,
    searchResponse: [],
  })),
  on(searchGameSuccess, (state, { searchResponse }) => ({
    ...state,
    searchResponse,
    loading: false,
    searchGameError: null,
    searchRequest: null,
  })),
  on(searchGameError, (state, { error }) => ({
    ...state,
    searchGameError: error,
    loading: false,
    searchResponse: [],
  })),
  on(fetchPlatforms, (state) => ({
    ...state,
    loading: true,
    fetchPlatformsError: null,
  })),
  on(fetchPlatformsSuccess, (state, { platforms }) => ({
    ...state,
    platforms,
    loading: false,
    fetchPlatformsError: null,
  })),
  on(fetchPlatformsError, (state, { error }) => ({
    ...state,
    fetchPlatformsError: error,
    loading: false,
    platforms: [],
  })),
  on(fetchGameDetails, (state, { gameId }) => ({
    ...state,
    loading: true,
    fetchGameDetailsError: null,
    gameDetails: [],
  })),
  on(fetchGameDetailsSuccess, (state, { gameDetails }) => ({
    ...state,
    gameDetails,
    loading: false,
    fetchGameDetailsError: null,
  })),
  on(fetchGameDetailsError, (state, { error }) => ({
    ...state,
    fetchGameDetailsError: error,
    loading: false,
    gameDetails: [],
  })),
  on(fetchCollection, (state) => ({
    ...state,
    loading: true,
    fetchCollectionError: null,
    collection: [],
  })),
  on(fetchCollectionSuccess, (state, { collection }) => ({
    ...state,
    collection,
    loading: false,
    fetchCollectionError: null,
  })),
  on(fetchCollectionError, (state, { error }) => ({
    ...state,
    fetchCollectionError: error,
    loading: false,
    collection: [],
  })),
  on(addToCollection, (state, { gameId }) => ({
    ...state,
    loading: true,
    addToCollectionError: null,
    addToCollectionSuccess: false,
  })),
  on(addToCollectionSuccess, (state, { gameId }) => ({
    ...state,
    loading: false,
    addToCollectionError: null,
    addToCollectionSuccess: true,
  })),
  on(addToCollectionError, (state, { error }) => ({
    ...state,
    addToCollectionError: error,
    loading: false,
    addToCollectionSuccess: false,
  })),
  on(removeGame, (state) => ({
    ...state,
    loading: true,
    removeGameError: null,
    removeGameSuccess: false,
  })),
  on(removeGameSuccess, (state, { gameId }) => ({
    ...state,
    loading: false,
    removeGameError: null,
    removeGameSuccess: true,
    collection: state.collection.filter((v) => v.gameId !== gameId),
  })),
  on(removeGameError, (state, { error }) => ({
    ...state,
    removeGameError: error,
    loading: false,
    removeGameSuccess: false,
  })),
  on(resetState, (state) => ({
    ...initialState,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
