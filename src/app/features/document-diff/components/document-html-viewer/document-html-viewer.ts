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

  protected readonly safeHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.html()),
  );

  constructor() {
    afterEveryRender(() => {
      this.highlightService.applyHighlights(
        this.contentRef().nativeElement,
        this.diffs(),
        this.side(),
        this.activeDiffId(),
      );
    });
  }
}
