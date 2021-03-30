import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './shared/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, AuthFacade, AUTH_FEATURE_KEY, reducer } from './+state';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { CollectionModule } from './collection/collection.module';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './shared/auth';

@NgModule({
  declarations: [AppComponent, LoginComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    HomeModule,
    CollectionModule,
    AuthModule,
    BrowserAnimationsModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthFacade,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
