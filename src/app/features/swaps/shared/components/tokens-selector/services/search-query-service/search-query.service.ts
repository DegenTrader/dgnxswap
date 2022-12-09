import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokensSelectorService } from '@features/swaps/shared/components/tokens-selector/services/tokens-selector-service/tokens-selector.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class SearchQueryService {
  /**
   * Contains string in search bar.
   */
  private readonly _query$ = new BehaviorSubject<string>('');

  public readonly query$ = this._query$.asObservable();

  public get query(): string {
    return this._query$.value;
  }

  public set query(value: string) {
    this._query$.next(value);
  }

  constructor(public readonly tokensSelectorService: TokensSelectorService) {
    this.subscribeOnSelectorListTypeChange();
  }

  private subscribeOnSelectorListTypeChange(): void {
    this.tokensSelectorService.selectorListType$.pipe(distinctUntilChanged()).subscribe(() => {
      this.query = '';
    });
  }
}
