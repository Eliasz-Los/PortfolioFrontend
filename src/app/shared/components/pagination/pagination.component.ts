import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 20;
  maxPagesToShow: number = 5;
  @Output() pageChange = new EventEmitter<number>();

  get totalPagesCount(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get middlePages(): number[] {
    const total = this.totalPagesCount;
    const max = Math.max(1, this.maxPagesToShow);
    if (total <= max + 2) {
      return Array.from({ length: Math.max(0, total - 2) }, (_, i) => i + 2);
    }

    const half = Math.floor(max / 2);
    let start = Math.max(2, this.currentPage - half);
    let end = Math.min(total - 1, this.currentPage + half);

    // shift window when near edges
    const available = end - start + 1;
    if (available < max) {
      if (start === 2) {
        end = Math.min(total - 1, start + max - 1);
      } else if (end === total - 1) {
        start = Math.max(2, end - max + 1);
      } else {
        start = Math.max(2, this.currentPage - half);
        end = Math.min(total - 1, start + max - 1);
      }
    }

    return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);
  }

  get showLeftEllipsis(): boolean {
    const totalIsLarge = this.totalPagesCount > this.maxPagesToShow + 2;
    const hasMiddle = this.middlePages.length > 0;
    const firstMiddleIsAfter2 = hasMiddle && this.middlePages[0] > 2;
    return totalIsLarge && firstMiddleIsAfter2;
  }

  get showRightEllipsis(): boolean {
    const total = this.totalPagesCount;
    const totalIsLarge = total > this.maxPagesToShow + 2;
    const hasMiddle = this.middlePages.length > 0;
    const lastMiddleIsBeforeLastMinus1 =
      hasMiddle && this.middlePages[this.middlePages.length - 1] < total - 1;
    return totalIsLarge && lastMiddleIsBeforeLastMinus1;
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPagesCount || page === this.currentPage) return;
    this.pageChange.emit(page);
  }
}
