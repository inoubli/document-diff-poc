import { Component, computed, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DocumentHtmlViewer } from '../../components/document-html-viewer/document-html-viewer';
import { DiffFilters } from '../../components/diff-filters/diff-filters';
import { DiffSidebar } from '../../components/diff-sidebar/diff-sidebar';
import { DiffItem, DiffStatus } from '../../models/document-diff.model';
import { MOCK_DOCUMENT_DIFF_CHUNKS } from '../../data/document-diff-chunks.mock';
import { DocumentDiffChunksMapperService } from '../../services/document-diff-chunks-mapper.service';

@Component({
  selector: 'app-document-diff-page',
  imports: [MatToolbarModule, MatIconModule, DocumentHtmlViewer, DiffFilters, DiffSidebar],
  templateUrl: './document-diff-page.html',
  styleUrl: './document-diff-page.scss',
})
export class DocumentDiffPage {
  private readonly mapper = inject(DocumentDiffChunksMapperService);

  protected readonly diffResponse = signal(this.mapper.map(MOCK_DOCUMENT_DIFF_CHUNKS));
  protected readonly activeDiff = signal<DiffItem | null>(null);
  protected readonly activeFilters = signal<Set<DiffStatus>>(
    new Set<DiffStatus>(['added', 'deleted', 'modified']),
  );

  protected readonly filteredDiffs = computed(() =>
    this.diffResponse().diffs.filter((d) => this.activeFilters().has(d.status)),
  );
}
