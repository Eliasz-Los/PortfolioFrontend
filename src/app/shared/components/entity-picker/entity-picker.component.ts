import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {EntityPickerViewModel} from '../../../core/models/hospital/EntityPickerViewModel';
import {EntitySearchComponent} from '../entity-search/entity-search.component';
import {LoadingComponent} from '../loading/loading.component';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'app-entity-picker',
  standalone: true,
  imports: [
    EntitySearchComponent,
    LoadingComponent,
    PaginationComponent
  ],
  templateUrl: './entity-picker.component.html',
  styleUrl: './entity-picker.component.css'
})
export class EntityPickerComponent implements OnChanges {
  @Input() title = 'Select an entity';
  @Input() searchPlaceholder = 'Search...';
  @Input() isLoading = false;

  @Input() items: EntityPickerViewModel[] = [];

  @Output() search = new EventEmitter<string | null>();
  @Output() select = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();

  @Input() pageSize = 10;
  @Input() currentPage = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['pageSize']) {
      const totalPages = Math.max(1, Math.ceil((this.items?.length ?? 0) / this.pageSize));
      if (this.currentPage > totalPages) {
       this.onPageChange(totalPages);
      }
    }
  }

  get paginatedItems(): EntityPickerViewModel[] {
    const items = this.items ?? [];
    const start = (this.currentPage - 1) * this.pageSize;
    return items.slice(start, start + this.pageSize);
  }

  get totalItems(): number {
    return (this.items ?? []).length;
  }

  get showPagination(): boolean {
    return this.totalItems > this.pageSize;
  }

  onSearch(term: string | null): void {
    this.currentPage = 1;
    this.search.emit(term);
    this.pageChange.emit(1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

}
