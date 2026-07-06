export const MOCK_DOCUMENT_DIFF_CHUNKS = {
  text_result: [
    {
      type: 'modification',
      v1_page: null,
      v1: "L'Impact de l'Intelligence Artificielle sur l'Avenir du Travail (Texte Original)",
      v2_page: null,
      v2: "L'Impact de l'Intelligence Artificielle sur l'Avenir du Travail (Texte Réécrit et Modifié)",
      similarity: 0.96,
      v1_paragraph_id: 2,
      v1_sentence_id: 1,
      v2_paragraph_id: 3,
      v2_sentence_id: 1,
    },
    {
      type: 'ajout',
      v1_page: null,
      v1: null,
      v2_page: null,
      v2: "Cette révolution technologique est souvent comparée à l'invention de l'imprimerie ou de l'électricité pour son potentiel à modifier la société",
      similarity: null,
      v2_paragraph_id: 4,
      v2_sentence_id: 2,
    },
    {
      type: 'suppression',
      v1_page: null,
      v1: 'Historiquement, chaque révolution industrielle a engendré des vagues de destruction créatrice',
      v2_page: null,
      v2: null,
      similarity: null,
      v1_paragraph_id: 4,
      v1_sentence_id: 1,
    },
    {
      type: 'suppression',
      v1_page: null,
      v1: "La mécanisation a remplacé la force musculaire humaine, puis l'automatisation informatique a pris en charge les tâches routinières",
      v2_page: null,
      v2: null,
      similarity: null,
      v1_paragraph_id: 4,
      v1_sentence_id: 2,
    },
  ],

  table_result: [
    {
      row_0: {
        locationFirstDoc: 'First table',
        locationSecondDoc: 'First table',
        Error: 'Different values',
        cellId: '0',
        Line: '0',
        Column: '0',
        valueFirstDoc: 'TEST',
        valueSecondDoc:
          '➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)',
      },
      row_1: {
        locationFirstDoc: 'First table',
        locationSecondDoc: 'First table',
        Error: 'Different values',
        cellId: '1',
        Line: '0',
        Column: '1',
        valueFirstDoc: 'TEST',
        valueSecondDoc:
          '➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)',
      },
      row_2: {
        locationFirstDoc: 'First table',
        locationSecondDoc: 'First table',
        Error: 'Different values',
        cellId: '2',
        Line: '0',
        Column: '2',
        valueFirstDoc: 'TEST',
        valueSecondDoc:
          '➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)',
      },
      row_3: {
        locationFirstDoc: 'First table',
        locationSecondDoc: 'First table',
        Error: 'Different values',
        cellId: '3',
        Line: '0',
        Column: '3',
        valueFirstDoc: 'TEST',
        valueSecondDoc:
          '➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)',
      },
    },
  ],

  chunks_v1:
    "[\n{\n\"id\": 0,\n\"position_order\": 3,\n\"paragraph_id\": 2,\n\"sentence_id\": 1,\n\"page\": null,\n\"type\": \"text\",\n\"text\": \"L'Impact de l'Intelligence Artificielle sur l'Avenir du Travail (Texte Original)\"\n},\n{\n\"position_order\": 1,\n\"title\": \"First table\",\n\"type\": \"table\",\n\"rows\": [\n[\n{\"cell_id\": 0,\"text\": \"TEST\",\"row\": 0,\"col\": 0},{\"cell_id\": 1,\"text\": \"TEST\",\"row\": 0,\"col\": 1},{\"cell_id\": 2,\"text\": \"TEST\",\"row\": 0,\"col\": 2},{\"cell_id\": 3,\"text\": \"TEST\",\"row\": 0,\"col\": 3}\n]\n]\n},\n]",

  chunks_v2:
    "[\n{\n\"id\": 0,\n\"position_order\": 4,\n\"paragraph_id\": 3,\n\"sentence_id\": 1,\n\"page\": null,\n\"type\": \"text\",\n\"text\": \"L'Impact de l'Intelligence Artificielle sur l'Avenir du Travail (Texte Réécrit et Modifié)\"\n},\n{\n\"position_order\": 1,\n\"title\": \"First table\",\n\"type\": \"table\",\n\"rows\": [\n[\n{\"cell_id\": 0,\"text\": \"➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)\",\"row\": 0,\"col\": 0},{\"cell_id\": 1,\"text\": \"➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)\",\"row\": 0,\"col\": 1},{\"cell_id\": 2,\"text\": \"➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)\",\"row\": 0,\"col\": 2},{\"cell_id\": 3,\"text\": \"➜ TABLEAU N°72 : VALEUR EXPOSÉE AU RISQUE DE CONTREPARTIE BILATÉRAL EN APPROCHE IRB (EU CCR4)\",\"row\": 0,\"col\": 3}\n]\n]\n},\n]",
} as const;
