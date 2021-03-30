import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthFacade } from '../+state';
import { GameViewDialogComponent } from '../shared/game-view-dialog/game-view-dialog.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  collection$ = this.authFacade.collection$;
  submitted = false;
  loading$ = this.authFacade.loading$;
  fetchCollectionError$ = this.authFacade.fetchCollectionError$;
  removeGameError$ = this.authFacade.removeGameError$;
  removeGameSuccess$ = this.authFacade.removeGameSuccess$;
  fetchCollectionScenarioError: HttpErrorResponse | null = null;
  removeGameScenarioSuccess = false;
  removeGameScenarioError: HttpErrorResponse | null = null;
  onDestroy$ = new Subject();

  constructor(
    private authFacade: AuthFacade,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.snackBarPopup();
  }

  ngOnInit(): void {
    this.authFacade.fetchCollection();
    combineLatest([
      this.fetchCollectionError$,
      this.removeGameSuccess$,
      this.removeGameError$,
    ])
      .pipe(takeUntil(this.onDestroy$))
      // tslint:disable-next-line: deprecation
      .subscribe(([collectionError, removeSuccess, removeError]) => {
        this.fetchCollectionScenarioError = collectionError;
        this.removeGameScenarioSuccess = removeSuccess;
        this.removeGameScenarioError = removeError;
        this.snackBarPopup();
      });
  }

  private snackBarPopup(): void {
    if (this.submitted && this.removeGameScenarioError) {
      this.snackBar.open(
        'Failed to remove Game from collection, please try again later',
        'OK',
        {
          duration: 3000,
        }
      );
    }
    if (this.submitted && this.removeGameScenarioSuccess) {
      this.snackBar.open('Game removed from collection', 'OK!', {
        duration: 3000,
      });
    }

    //   reset submitted state
    setTimeout(() => {
      this.submitted = false;
    }, 1000);
  }

  onRemoveGame(gameId: number): void {
    this.submitted = true;
    this.authFacade.removeGame(gameId);
  }

  onViewGame(gameId: number): void {
    this.authFacade.fetchGameDetails(gameId);
    this.dialog.open(GameViewDialogComponent, {
      width: '500px',
      maxHeight: 700,
    });
  }
}
