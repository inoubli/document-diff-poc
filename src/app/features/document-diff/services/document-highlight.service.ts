import { Injectable } from '@angular/core';
import { DiffItem } from '../models/document-diff.model';

const HIGHLIGHT_CLASSES = ['diff-added', 'diff-deleted', 'diff-modified', 'diff-active'] as const;

@Injectable({ providedIn: 'root' })
export class DocumentHighlightService {
  applyHighlights(
    container: HTMLElement,
    diffs: DiffItem[],
    side: 'left' | 'right',
    activeDiffId: string | null,
  ): void {
    container.querySelectorAll(HIGHLIGHT_CLASSES.map((c) => `.${c}`).join(',')).forEach((el) => {
      el.classList.remove(...HIGHLIGHT_CLASSES);
    });

    for (const diff of diffs) {
      const target = side === 'left' ? diff.left : diff.right;
      if (!target) continue;

      const el = container.querySelector(target.selector);
      if (!el) continue;

      el.classList.add(`diff-${diff.status}`);

      if (diff.id === activeDiffId) {
        el.classList.add('diff-active');
      }
    }
  }
}
