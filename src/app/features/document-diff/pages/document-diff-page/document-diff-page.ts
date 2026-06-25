import { Component, computed, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DocumentHtmlViewer } from '../../components/document-html-viewer/document-html-viewer';
import { DiffFilters } from '../../components/diff-filters/diff-filters';
import { DiffSidebar } from '../../components/diff-sidebar/diff-sidebar';
import { DiffItem, DiffStatus } from '../../models/document-diff.model';
import { MOCK_DOCUMENT_DIFF } from '../../data/document-diff.mock';

@Component({
  selector: 'app-document-diff-page',
  imports: [MatToolbarModule, MatIconModule, DocumentHtmlViewer, DiffFilters, DiffSidebar],
  templateUrl: './document-diff-page.html',
  styleUrl: './document-diff-page.scss',
})
export class DocumentDiffPage {
  protected readonly diffResponse = signal(MOCK_DOCUMENT_DIFF);
  protected readonly activeDiff = signal<DiffItem | null>(null);
  protected readonly activeFilters = signal<Set<DiffStatus>>(
    new Set<DiffStatus>(['added', 'deleted', 'modified']),
  );

  protected readonly filteredDiffs = computed(() =>
    this.diffResponse().diffs.filter((d) => this.activeFilters().has(d.status)),
  );
}
