export interface DocumentDiffResponse {
  leftHtml: string;
  rightHtml: string;
  diffs: DiffItem[];
}

export type DiffStatus = 'added' | 'deleted' | 'modified';

export interface DiffItem {
  id: string;
  status: DiffStatus;
  targetType: 'text' | 'table-cell' | 'table-row' | 'image';
  label: string;
  left: DiffTarget | null;
  right: DiffTarget | null;
}

export interface DiffTarget {
  nodeId: string;
  selector: string;
}
