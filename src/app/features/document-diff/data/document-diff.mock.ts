import { DocumentDiffResponse } from '../models/document-diff.model';

export const MOCK_DOCUMENT_DIFF: DocumentDiffResponse = {
  leftHtml: `
    <div class="doc-page">
      <h2>Contrat de Prêt Immobilier</h2>
      <p data-node-id="paragraph-1">
        Le taux annuel appliqué au contrat est de
        <span data-segment-id="p1-s2">3.20%</span>
        pour une durée de 20 ans.
      </p>
      <p data-node-id="paragraph-2">
        Le montant total emprunté est de
        <span data-segment-id="p2-s1">250 000 €</span>.
      </p>
      <table>
        <thead>
          <tr><th>Échéance</th><th>Capital</th><th>Intérêts</th></tr>
        </thead>
        <tbody>
          <tr data-row-id="table-1-r1">
            <td data-cell-id="table-1-r1-c1">Janvier 2025</td>
            <td data-cell-id="table-1-r1-c2">800 €</td>
            <td data-cell-id="table-1-r1-c3">667 €</td>
          </tr>
          <tr data-row-id="table-1-r2">
            <td data-cell-id="table-1-r2-c1">Février 2025</td>
            <td data-cell-id="table-1-r2-c2">803 €</td>
            <td data-cell-id="table-1-r2-c3">664 €</td>
          </tr>
        </tbody>
      </table>
      <p data-node-id="paragraph-3">
        Les frais de dossier s'élèvent à <span data-segment-id="p3-s1">1 500 €</span>.
      </p>
      <img data-image-id="image-1" src="https://placehold.co/400x100?text=Signature+Originale" alt="Signature originale" />
    </div>
  `,
  rightHtml: `
    <div class="doc-page">
      <h2>Contrat de Prêt Immobilier</h2>
      <p data-node-id="paragraph-1">
        Le taux annuel appliqué au contrat est de
        <span data-segment-id="p1-s2">3.85%</span>
        pour une durée de 20 ans.
      </p>
      <p data-node-id="paragraph-2">
        Le montant total emprunté est de
        <span data-segment-id="p2-s1">250 000 €</span>.
      </p>
      <table>
        <thead>
          <tr><th>Échéance</th><th>Capital</th><th>Intérêts</th></tr>
        </thead>
        <tbody>
          <tr data-row-id="table-1-r1">
            <td data-cell-id="table-1-r1-c1">Janvier 2025</td>
            <td data-cell-id="table-1-r1-c2">780 €</td>
            <td data-cell-id="table-1-r1-c3">687 €</td>
          </tr>
          <tr data-row-id="table-1-r2">
            <td data-cell-id="table-1-r2-c1">Février 2025</td>
            <td data-cell-id="table-1-r2-c2">783 €</td>
            <td data-cell-id="table-1-r2-c3">684 €</td>
          </tr>
          <tr data-row-id="table-1-r3">
            <td data-cell-id="table-1-r3-c1">Mars 2025</td>
            <td data-cell-id="table-1-r3-c2">786 €</td>
            <td data-cell-id="table-1-r3-c3">681 €</td>
          </tr>
        </tbody>
      </table>
      <p data-node-id="paragraph-3">
        Les frais de dossier s'élèvent à <span data-segment-id="p3-s1">1 500 €</span>.
      </p>
      <img data-image-id="image-1" src="https://placehold.co/400x100?text=Nouvelle+Signature" alt="Nouvelle signature" />
    </div>
  `,
  diffs: [
    {
      id: 'diff-1',
      status: 'modified',
      targetType: 'text',
      label: 'Taux annuel modifié',
      left: { nodeId: 'paragraph-1', selector: "[data-segment-id='p1-s2']" },
      right: { nodeId: 'paragraph-1', selector: "[data-segment-id='p1-s2']" },
    },
    {
      id: 'diff-2',
      status: 'modified',
      targetType: 'table-cell',
      label: 'Capital janvier modifié',
      left: { nodeId: 'table-1-r1', selector: "[data-cell-id='table-1-r1-c2']" },
      right: { nodeId: 'table-1-r1', selector: "[data-cell-id='table-1-r1-c2']" },
    },
    {
      id: 'diff-3',
      status: 'modified',
      targetType: 'table-cell',
      label: 'Intérêts janvier modifiés',
      left: { nodeId: 'table-1-r1', selector: "[data-cell-id='table-1-r1-c3']" },
      right: { nodeId: 'table-1-r1', selector: "[data-cell-id='table-1-r1-c3']" },
    },
    {
      id: 'diff-4',
      status: 'added',
      targetType: 'table-row',
      label: 'Nouvelle ligne mars 2025',
      left: null,
      right: { nodeId: 'table-1-r3', selector: "[data-row-id='table-1-r3']" },
    },
    {
      id: 'diff-5',
      status: 'modified',
      targetType: 'image',
      label: 'Signature mise à jour',
      left: { nodeId: 'image-1', selector: "[data-image-id='image-1']" },
      right: { nodeId: 'image-1', selector: "[data-image-id='image-1']" },
    },
  ],
};
