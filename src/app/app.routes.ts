import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'document-diff', pathMatch: 'full' },
  {
    path: 'document-diff',
    loadComponent: () =>
      import('./features/document-diff/pages/document-diff-page/document-diff-page').then(
        (m) => m.DocumentDiffPage,
      ),
  },
];
