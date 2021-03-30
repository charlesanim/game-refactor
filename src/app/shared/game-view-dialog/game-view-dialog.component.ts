import { Component } from '@angular/core';
import { AuthFacade } from 'src/app/+state';

@Component({
  selector: 'app-game-view-dialog',
  templateUrl: './game-view-dialog.component.html',
  styleUrls: ['./game-view-dialog.component.scss'],
})
export class GameViewDialogComponent {
  gameDetails$ = this.authFacade.gameDetails$;
  loading$ = this.authFacade.loading$;
  fetchGameDetailsError$ = this.authFacade.fetchGameDetailsError$;
  constructor(private authFacade: AuthFacade) {}
}
