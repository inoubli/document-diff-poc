import { Component, input, output } from '@angular/core';
import { DiffItem } from '../../models/document-diff.model';

@Component({
  selector: 'app-diff-card',
  templateUrl: './diff-card.html',
  styleUrl: './diff-card.scss',
})
export class DiffCard {
  readonly diff = input.required<DiffItem>();
  readonly isActive = input<boolean>(false);
  readonly clicked = output<void>();
}
