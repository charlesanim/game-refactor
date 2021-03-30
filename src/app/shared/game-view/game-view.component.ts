import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthFacade } from 'src/app/+state';
import { Collection, SearchResponse } from '../data-models';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
})
export class GameViewComponent {
  @Input() gameResponse: SearchResponse[] | null = [];
  @Input() collection: Collection[] | null = [];
  @Input() error: HttpErrorResponse | null = null;
  @Input() addToCollectionSuccess: boolean | null = false;
  @Input() removeGameSuccess: boolean | null = false;
  @Input() fetchCollectionError: HttpErrorResponse | null = null;
  @Input() removeGameError: HttpErrorResponse | null = null;
  @Output() addGame = new EventEmitter<number>();
  @Output() viewGame = new EventEmitter<number>();
  @Output() removeGame = new EventEmitter<number>();

  collection$ = this.authFacade.collection$;
  isAvailable = false;
  submitted = false;

  constructor(
    private authFacade: AuthFacade,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
    if (this.error && this.submitted) {
      this.snackBar.open(
        'Failed to add to collection, please try again later',
        'OK',
        {
          duration: 3000,
        }
      );
    }
  }

  onSubmit(gameId: number): void {
    // find platform Number of selected platform name
    this.isAvailable = this.collection
      ? this.collection.filter((o) => o.gameId === gameId).length > 0
      : false;

    if (!this.isAvailable) {
      this.submitted = true;
      this.addGame.emit(gameId);
      this.snackBar.open('Game added to collection', 'OK!', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Game already in collection', 'OK!', {
        duration: 3000,
      });
    }
  }

  viewGameDetails(gameId: number): void {
    this.viewGame.emit(gameId);
  }

  onRemoveGame(gameId: number): void {
    this.submitted = true;
    this.authFacade.removeGame(gameId);
  }
}
