import {
  afterEveryRender,
  Component,
  computed,
  inject,
  input,
  viewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DiffItem } from '../../models/document-diff.model';
import { DocumentHighlightService } from '../../services/document-highlight.service';

/**
 * Sole location in the app where backend HTML is trusted and rendered.
 * All DomSanitizer usage must stay here — never spread to other components.
 *
 * ViewEncapsulation.None is required so that Angular's scoped attribute
 * selectors don't block styles from reaching elements injected via innerHTML.
 */
@Component({
  selector: 'app-document-html-viewer',
  templateUrl: './document-html-viewer.html',
  styleUrl: './document-html-viewer.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'document-html-viewer' },
})
export class DocumentHtmlViewer {
  readonly html = input.required<string>();
  readonly diffs = input.required<DiffItem[]>();
  readonly side = input.required<'left' | 'right'>();
  readonly activeDiffId = input<string | null>(null);

  private readonly sanitizer = inject(DomSanitizer);
  private readonly highlightService = inject(DocumentHighlightService);
  private readonly contentRef = viewChild.required<ElementRef<HTMLElement>>('contentRef');

  // Tracks the last diff id we scrolled to — undefined means "not yet seen".
  // Only scroll when the value actually changes to avoid jumping on unrelated renders.
  private lastScrolledDiffId: string | null | undefined = undefined;

  protected readonly safeHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.html()),
  );

  constructor() {
    afterEveryRender(() => {
      const container = this.contentRef().nativeElement;
      const diffs = this.diffs();
      const side = this.side();
      const activeDiffId = this.activeDiffId();

      this.highlightService.applyHighlights(container, diffs, side, activeDiffId);

      if (activeDiffId !== this.lastScrolledDiffId) {
        this.lastScrolledDiffId = activeDiffId;
        if (activeDiffId) {
          this.scrollToDiff(container, diffs, side, activeDiffId);
        }
      }
    });
  }

  private scrollToDiff(
    container: HTMLElement,
    diffs: DiffItem[],
    side: 'left' | 'right',
    diffId: string,
  ): void {
    const diff = diffs.find((d) => d.id === diffId);
    console.log(diffId)
    if (!diff) return;

    const target = side === 'left' ? diff.left : diff.right;
    if (!target) return; // This side has no target (e.g. 'added' diff has left: null)

    const el = container.querySelector<HTMLElement>(target.selector);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
