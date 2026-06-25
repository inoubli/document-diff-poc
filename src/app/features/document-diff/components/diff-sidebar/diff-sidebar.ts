import { Component, input, output } from '@angular/core';
import { DiffCard } from '../diff-card/diff-card';
import { DiffItem } from '../../models/document-diff.model';

@Component({
  selector: 'app-diff-sidebar',
  imports: [DiffCard],
  templateUrl: './diff-sidebar.html',
  styleUrl: './diff-sidebar.scss',
})
export class DiffSidebar {
  readonly diffs = input.required<DiffItem[]>();
  readonly activeDiffId = input<string | null>(null);
  readonly diffSelected = output<DiffItem>();
}
