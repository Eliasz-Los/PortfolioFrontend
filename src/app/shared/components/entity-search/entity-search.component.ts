import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-entity-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entity-search.component.html',
  styleUrls: ['./entity-search.component.css']
})
export class EntitySearchComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Search...';
  @Input() debounce = 300;
  @Output() search = new EventEmitter<string | null>();

  control = new FormControl<string>('', { nonNullable: true });
  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.control.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe((value: string) => {
        const trimmed = value?.trim();
        this.search.emit(trimmed ? trimmed : null);
      });
  }

  clear(): void {
    this.control.setValue('');
    this.search.emit(null);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
