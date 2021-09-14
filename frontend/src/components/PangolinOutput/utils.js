const render = (x) => <kbd>{x}</kbd>;

export const FIELDS = [
  {
    name: 'lineage',
    label: 'Lineage',
    render: (x, pred) => <b>{pred['Lineage name'] || x}</b>,
  },
  { name: 'probability', label: 'Assignment probability' },
  {
    name: 'conflict',
    label: 'Assignment conflict',
    extra:
      '0 = no conflicts, otherwise the number of categories the sequence could fit into',
  },
  {
    name: 'ambiguity_score',
    label: 'Ambiguity score',
    extra:
      'A score of 1 indicates that no sites were imputed, while a score of 0 indicates that more sites were imputed than were not imputed.',
  },
  { name: 'Date range' },
  { name: 'Days since last sampling' },
  { name: 'Most common countries' },
  { name: 'Number of taxa' },
  { name: 'scorpio_call', label: 'Scorpio call' },
  { name: 'scorpio_support', label: 'Scorpio support' },
  { name: 'scorpio_conflict', label: 'Scorpio conflict' },
  { name: 'version', label: 'Version', render },
  {
    name: 'pangolin_version',
    label: 'Pangolin version',
    render,
  },
  {
    name: 'pangoLEARN_version',
    label: 'pangoLEARN version',
    render,
  },
  {
    name: 'pango_version',
    label: 'Pango version',
    render,
  },
  { name: 'status', label: 'Status' },
  { name: 'note', label: 'Note' },
];
