import { Component, computed, model } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { DiffStatus } from '../../models/document-diff.model';

@Component({
  selector: 'app-diff-filters',
  imports: [MatButtonToggleModule],
  templateUrl: './diff-filters.html',
  styleUrl: './diff-filters.scss',
})
export class DiffFilters {
  readonly activeFilters = model.required<Set<DiffStatus>>();

  protected readonly activeFiltersArray = computed(() => [...this.activeFilters()]);

  protected onFilterChange(event: MatButtonToggleChange): void {
    this.activeFilters.set(new Set<DiffStatus>(event.value));
  }
}
