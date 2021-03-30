/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { LoginRequest, SearchRequest } from '../shared/data-models';
import {
  addToCollection,
  fetchCollection,
  fetchGameDetails,
  fetchPlatforms,
  login,
  removeGame,
  resetState,
  searchGame,
} from './auth.actions';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';

@Injectable()
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loading$ = this.store$.pipe(select(authQuery.getLoading));
  loginLoading$ = this.store$.pipe(select(authQuery.getLoginLoading));
  searchGame$ = this.store$.pipe(select(authQuery.getSearchGameSuccess));
  platforms$ = this.store$.pipe(select(authQuery.getPlatforms));
  gameDetails$ = this.store$.pipe(select(authQuery.getGameDetails));
  collection$ = this.store$.pipe(select(authQuery.getCollection));
  addToCollectionSuccess$ = this.store$.pipe(
    select(authQuery.addToCollectionSuccess)
  );
  removeGameSuccess$ = this.store$.pipe(select(authQuery.removeGameSuccess));

  //Error
  loginError$ = this.store$.pipe(select(authQuery.getLoginError));
  searchGameError$ = this.store$.pipe(select(authQuery.getSearchGameError));
  fetchPlatformsError$ = this.store$.pipe(
    select(authQuery.getFetchPlatformsError)
  );
  fetchCollectionError$ = this.store$.pipe(
    select(authQuery.getFetchCollectionError)
  );
  fetchGameDetailsError$ = this.store$.pipe(
    select(authQuery.getFetchGameDetailsError)
  );
  addToCollectionError$ = this.store$.pipe(
    select(authQuery.getAddToCollectionError)
  );
  removeGameError$ = this.store$.pipe(select(authQuery.getRemoveGameError));

  searchGame(searchRequest: SearchRequest): void {
    this.store$.dispatch(searchGame({ searchRequest }));
  }

  loginSubmit(loginRequest: LoginRequest): void {
    this.store$.dispatch(login({ loginRequest }));
  }

  fetchPlatforms(): void {
    this.store$.dispatch(fetchPlatforms());
  }

  fetchGameDetails(gameId: number): void {
    this.store$.dispatch(fetchGameDetails({ gameId }));
  }

  fetchCollection(): void {
    this.store$.dispatch(fetchCollection());
  }

  addToCollection(gameId: number): void {
    this.store$.dispatch(addToCollection({ gameId }));
  }

  removeGame(gameId: number): void {
    this.store$.dispatch(removeGame({ gameId }));
  }
  resetState(): void {
    this.store$.dispatch(resetState());
  }

  constructor(private store$: Store<AuthPartialState>) {}
}
