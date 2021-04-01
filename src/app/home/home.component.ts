import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '../+state';
import { SearchRequest } from '../shared/data-models';
import { GameViewDialogComponent } from '../shared/game-view-dialog/game-view-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // fixes the NG0100: Expression has changed after it was checked
  // see more here `https://angular.io/errors/NG0100`
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  platforms$ = this.authFacade.platforms$;
  loading$ = this.authFacade.loading$;
  searchGame$ = this.authFacade.searchGame$;
  collection$ = this.authFacade.collection$;
  addToCollectionError$ = this.authFacade.addToCollectionError$;
  searchGameError$ = this.authFacade.searchGameError$;
  addToCollectionSuccess$ = this.authFacade.addToCollectionSuccess$;
  gameSearchLoading$ = this.authFacade.gameSearchLoading$;

  constructor(private authFacade: AuthFacade, public dialog: MatDialog) {}

  ngOnInit(): void {
    // make these api calls on init, effects will handle if these actions should dispatch based on if data is already available

    this.authFacade.fetchPlatforms();

    this.authFacade.fetchCollection();
  }
  onSearchGames(searchRequest: SearchRequest): void {
    this.authFacade.searchGame(searchRequest);
  }
  onAddGame(gameId: number): void {
    this.authFacade.addToCollection(gameId);
  }
  onViewGame(gameId: number): void {
    this.authFacade.fetchGameDetails(gameId);
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(GameViewDialogComponent, {
      width: '700px',
      maxHeight: 700,
    });
  }
}
