import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  Collection,
  GameDetails,
  LoginRequest,
  LoginResponse,
  Platforms,
  SearchRequest,
  SearchResponse,
} from '../shared/data-models';

export const login = createAction(
  '[Auth] Login',
  props<{ loginRequest: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginResponse: LoginResponse }>()
);

export const loginError = createAction(
  '[Auth] Login Error',
  props<{ error: HttpErrorResponse | null }>()
);

export const logOut = createAction('[Auth] Log Out');

export const searchGame = createAction(
  '[Home] Search Game',
  props<{ searchRequest: SearchRequest }>()
);

export const searchGameSuccess = createAction(
  '[Home] Search Game Success',
  props<{ searchResponse: SearchResponse[] }>()
);

export const searchGameError = createAction(
  '[Home] Search Game Error',
  props<{ error: HttpErrorResponse | null }>()
);

export const fetchPlatforms = createAction('[Home] Fetch Platforms');

export const fetchPlatformsSuccess = createAction(
  '[Home] Fetch Platforms Success',
  props<{ platforms: Platforms[] }>()
);

export const fetchPlatformsError = createAction(
  '[Home] Fetch Platforms Error',
  props<{ error: HttpErrorResponse | null }>()
);

export const fetchGameDetails = createAction(
  '[Home] Fetch Game Details',
  props<{ gameId: number }>()
);

export const fetchGameDetailsSuccess = createAction(
  '[Home] Fetch Game Details Success',
  props<{ gameDetails: GameDetails[] }>()
);

export const fetchGameDetailsError = createAction(
  '[Home] Fetch Game Details Error',
  props<{ error: HttpErrorResponse | null }>()
);

export const fetchCollection = createAction('[Home] Fetch Game Collection');

export const fetchCollectionSuccess = createAction(
  '[Home] Fetch Game Collection Success',
  props<{ collection: Collection[] }>()
);

export const fetchCollectionError = createAction(
  '[Home] Fetch Game Collection Error',
  props<{ error: HttpErrorResponse | null }>()
);

export const addToCollection = createAction(
  '[Home] Add To Game Collection',
  props<{ gameId: number }>()
);

export const addToCollectionSuccess = createAction(
  '[Home] Add To Game Collection Success',
  props<{ gameId: number }>()
);

export const addToCollectionError = createAction(
  '[Home] Add To Game Collection Error',
  props<{ error: HttpErrorResponse | null }>()
);
export const removeGame = createAction(
  '[Home] Remove Game from Collection',
  props<{ gameId: number }>()
);

export const removeGameSuccess = createAction(
  '[Home] Remove Game from Collection Success',
  props<{ gameId: number }>()
);

export const removeGameError = createAction(
  '[Home] Remove Game from Collection Error',
  props<{ error: HttpErrorResponse | null }>()
);

export const resetState = createAction('[Auth] Reset State');
