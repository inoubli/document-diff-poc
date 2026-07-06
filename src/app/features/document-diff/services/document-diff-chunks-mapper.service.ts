import { Injectable } from '@angular/core';
import {
  ChunkDiffType,
  DocumentDiffChunksResponse,
  TableCellDiff,
  TextChunk,
  TextDiffChunk,
} from '../models/document-diff-chunks.model';
import { DiffItem, DiffStatus, DocumentDiffResponse } from '../models/document-diff.model';

const TYPE_MAP: Record<ChunkDiffType, DiffStatus> = {
  modification: 'modified',
  ajout: 'added',
  suppression: 'deleted',
};

@Injectable({ providedIn: 'root' })
export class DocumentDiffChunksMapperService {
  map(chunks: DocumentDiffChunksResponse): DocumentDiffResponse {
    const textChunksV1 = this.parseJson<TextChunk[]>(chunks.chunks_v1);
    const textChunksV2 = this.parseJson<TextChunk[]>(chunks.chunks_v2);

    const leftHtml = this.buildTextHtml(textChunksV1);
    const rightHtml = this.buildTextHtml(textChunksV2);

    const textDiffs = this.mapTextDiffs(chunks.text_result);
    const tableDiffs = this.mapTableDiffs(chunks.table_result);

    return { leftHtml, rightHtml, diffs: [...textDiffs, ...tableDiffs] };
  }

  private buildTextHtml(chunks: TextChunk[]): string {
    const sorted = [...chunks].sort((a, b) => a.position_order - b.position_order);

    // Group sentences by paragraph_id, preserving paragraph order of first occurrence.
    const order: number[] = [];
    const byParagraph = new Map<number, TextChunk[]>();
    for (const chunk of sorted) {
      if (!byParagraph.has(chunk.paragraph_id)) {
        byParagraph.set(chunk.paragraph_id, []);
        order.push(chunk.paragraph_id);
      }
      byParagraph.get(chunk.paragraph_id)!.push(chunk);
    }

    return order
      .map((paragraphId) => {
        const sentences = byParagraph
          .get(paragraphId)!
          .sort((a, b) => a.sentence_id - b.sentence_id);

        const sentenceHtml = sentences
          .map(
            (s) =>
              `<span data-segment-id="p${paragraphId}-s${s.sentence_id}">${s.text}</span>`,
          )
          .join(' ');

        return `<p data-node-id="p-${paragraphId}">${sentenceHtml}</p>`;
      })
      .join('');
  }

  private mapTextDiffs(textResult: ReadonlyArray<TextDiffChunk>): DiffItem[] {
    return textResult.map((chunk, i) => ({
      id: `text-diff-${i}`,
      status: TYPE_MAP[chunk.type],
      targetType: 'text' as const,
      label: this.truncate(chunk.v1 ?? chunk.v2 ?? ''),
      left:
        chunk.v1_paragraph_id !== undefined
          ? {
              nodeId: `p-${chunk.v1_paragraph_id}`,
              selector: `[data-segment-id='p${chunk.v1_paragraph_id}-s${chunk.v1_sentence_id}']`,
            }
          : null,
      right:
        chunk.v2_paragraph_id !== undefined
          ? {
              nodeId: `p-${chunk.v2_paragraph_id}`,
              selector: `[data-segment-id='p${chunk.v2_paragraph_id}-s${chunk.v2_sentence_id}']`,
            }
          : null,
    }));
  }

  private mapTableDiffs(tableResult: ReadonlyArray<Record<string, TableCellDiff>>): DiffItem[] {
    const diffs: DiffItem[] = [];
    let idx = 0;

    for (const tableEntry of tableResult) {
      for (const cell of Object.values(tableEntry)) {
        diffs.push({
          id: `table-diff-${idx++}`,
          status: 'modified',
          targetType: 'table-cell',
          label: `${cell.locationFirstDoc} — L${cell.Line} C${cell.Column}`,
          left: {
            nodeId: `${cell.locationFirstDoc}-r${cell.Line}`,
            selector: `[data-cell-id='${cell.locationFirstDoc}-r${cell.Line}-c${cell.Column}']`,
          },
          right: {
            nodeId: `${cell.locationSecondDoc}-r${cell.Line}`,
            selector: `[data-cell-id='${cell.locationSecondDoc}-r${cell.Line}-c${cell.Column}']`,
          },
        });
      }
    }

    return diffs;
  }

  /** Strips trailing commas before parsing — the API may return non-strict JSON. */
  private parseJson<T>(raw: string): T {
    return JSON.parse(raw.replace(/,\s*([}\]])/g, '$1')) as T;
  }

  private truncate(text: string, max = 60): string {
    return text.length > max ? text.slice(0, max) + '…' : text;
  }
}
