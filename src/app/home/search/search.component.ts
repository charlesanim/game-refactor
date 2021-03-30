import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Collection,
  Platforms,
  SearchRequest,
  SearchResponse,
} from '../../shared/data-models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchForm: FormGroup;
  @Input() loading: boolean | null = false;
  @Input()
  searchGame!: SearchResponse[] | null;
  @Input()
  platforms!: Platforms[];
  @Input()
  collection!: Collection[];
  @Input() error: HttpErrorResponse | null = null;
  @Output() searchGames = new EventEmitter<SearchRequest>();
  submitted = false;

  filteredPlatforms$: Observable<Platforms[]>;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    // render searchform
    this.searchForm = this.formBuilder.group({
      // Validators to make sure user can search based on letters and numbers in the string
      gameName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9()& \-]{1,}$/)],
      ],
      platformName: [null, Validators.pattern(/^[a-zA-Z0-9()& \-]{1,}$/)],
    });
    // prep platform array filtering based on user input
    this.filteredPlatforms$ = this.platformName.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  // private function gets called when user begins searching for platform and
  // filters array based off of the searched value matches any data in the array
  private _filter(value: string): Platforms[] {
    const filterValue = value.toLowerCase();

    return this.platforms
      ? this.platforms.filter((o) => o.name.toLowerCase().includes(filterValue))
      : [];
  }
  // getter
  get platformName(): FormControl {
    return this.searchForm.controls.platformName as FormControl;
  }

  get gameName(): FormControl {
    return this.searchForm.controls.gameName as FormControl;
  }

  // submit function to submit search
  onSubmit(): void {
    this.submitted = true;
    // check if form is valid, and submit else throw error
    if (this.searchForm.valid) {
      // find platform Number of selected platform name
      const id = this.searchForm.value.platformName
        ? this.platforms?.find((o) =>
            o.name.includes(this.searchForm.value.platformName)
          )
        : null;

      this.searchGames.emit({
        gameName: this.searchForm.value.gameName,
        platformId: id?.platformId,
      });
    } else {
      this.searchForm.markAllAsTouched();
    }
  }
}
