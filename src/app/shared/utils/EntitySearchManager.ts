import {AlertService} from '../../core/services/alert.service';
import {finalize, Observable} from 'rxjs';

export abstract class EntitySearchManager<T> {
  isLoading = false;
  currentPage = 1;

  protected constructor(protected readonly alertService: AlertService) {}

  protected abstract loadAll$(): Observable<T[]>;
  protected abstract search$(term: string): Observable<T[]>;

  protected applyList(list: T[], assign: (list: T[]) => void): void {
    assign(list);
    this.currentPage = 1;
  }


  onSearchGeneric(term: string | null, assign: (list: T[]) => void): void {
    this.isLoading = true;

    const request$ = term ? this.search$(term) : this.loadAll$();

    request$
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: list => this.applyList(list, assign),
        error: () => this.alertService.error(`Search failed${term ? ` for: ${term}` : ''}.`)
      });
  }
}
