import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
@Input() totalItems: number = 0;
@Input() currentPage: number = 1;
@Input() pageSize: number = 20;
@Output() pageChange = new EventEmitter<number>();


  get totalPages(): number[] {
    const total = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    this.pageChange.emit(page);
  }
}
