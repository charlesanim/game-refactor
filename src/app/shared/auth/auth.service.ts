/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Collection,
  GameDetails,
  LoginRequest,
  LoginResponse,
  Platforms,
  SearchRequest,
  SearchResponse,
} from '../data-models';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl = 'https://games.excellentpeople.com';

  private accessGrantedSubject$ = new BehaviorSubject<string>('');
  public usernameSubject$ = new BehaviorSubject<string>('');

  accessGranted$ = this.accessGrantedSubject$.asObservable();
  username$ = this.usernameSubject$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const accessGranted = localStorage.getItem('accessGranted');
    const user = localStorage.getItem('username');
    if (accessGranted) {
      this.accessGrantedSubject$.next(accessGranted);
      this.usernameSubject$.next(user as string);
    }
  }

  login(authenticate: LoginRequest) {
    const request = new FormData();
    request.append('username', authenticate.username);
    request.append('password', authenticate.password);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((res: LoginResponse) => {
        this.accessGrantedSubject$.next(res.token);
        this.usernameSubject$.next(authenticate.username);
        localStorage.setItem('accessGranted', res.token);
        localStorage.setItem('username', `${authenticate.username}`);
      })
    );
  }

  logout() {
    // remove user from and log user out
    localStorage.removeItem('accessGranted');
    localStorage.removeItem('username');
    this.accessGrantedSubject$.next('');
    this.usernameSubject$.next('');
    this.router.navigate(['/login']);
  }

  searchGame(searchRequest: SearchRequest) {
    //set http params
    const params: HttpParams = new HttpParams().set(
      'platformId',
      ((searchRequest.platformId as unknown) as string) || '' // type cast of number type to string for params
    );

    return this.http
      .get<SearchResponse[]>(
        `${this.apiUrl}/Games/search/${searchRequest.gameName}`,
        { params }
      )
      .pipe(map((res: SearchResponse[]) => res));
  }

  fetchPlatforms() {
    return this.http
      .get<Platforms[]>(`${this.apiUrl}/Platforms`)
      .pipe(map((res: Platforms[]) => res));
  }

  fetchGameDetails(gameId: number) {
    return this.http
      .get<GameDetails[]>(`${this.apiUrl}/Games/${gameId}`)
      .pipe(map((res: GameDetails[]) => res));
  }

  fetchCollection() {
    return this.http
      .get<Collection[]>(`${this.apiUrl}/Collection`)
      .pipe(map((res: Collection[]) => res));
  }

  addToCollection(gameId: number) {
    return this.http
      .post(`${this.apiUrl}/Collection/${gameId}`, gameId)
      .pipe(map((res: any) => res));
  }
  removeGame(gameId: number) {
    return this.http
      .delete(`${this.apiUrl}/Collection/${gameId}`)
      .pipe(map((res: any) => res));
  }
}

export const checkValidResponse = (response: any) => {
  if (response) {
    return response;
  } else {
    throw new Error();
  }
};
