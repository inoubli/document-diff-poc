export type ChunkDiffType = 'modification' | 'ajout' | 'suppression';

export interface TextDiffChunk {
  type: ChunkDiffType;
  v1: string | null;
  v2: string | null;
  v1_page: number | null;
  v2_page: number | null;
  v1_paragraph_id?: number;
  v1_sentence_id?: number;
  v2_paragraph_id?: number;
  v2_sentence_id?: number;
  similarity: number | null;
}

export interface TableCellDiff {
  locationFirstDoc: string;
  locationSecondDoc: string;
  Error: string;
  cellId: string;
  Line: string;
  Column: string;
  valueFirstDoc: string;
  valueSecondDoc: string;
}

export interface DocumentDiffChunksResponse {
  text_result: ReadonlyArray<TextDiffChunk>;
  /** Each entry is a map of row_N keys to cell diffs for one table. */
  table_result: ReadonlyArray<Record<string, TableCellDiff>>;
  /** JSON-encoded array of TextChunk — full document v1 content. */
  chunks_v1: string;
  /** JSON-encoded array of TextChunk — full document v2 content. */
  chunks_v2: string;
}

/** One sentence-level entry from the parsed chunks_v1 / chunks_v2 JSON. */
export interface TextChunk {
  id: number;
  position_order: number;
  paragraph_id: number;
  sentence_id: number;
  page: number | null;
  type: 'text';
  text: string;
}
