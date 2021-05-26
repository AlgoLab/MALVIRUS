export const FIELDS = [
  {
    name: 'lineage',
    label: 'Lineage',
    render: (x, pred) => <b>{pred['Lineage name'] || x}</b>,
  },
  { name: 'probability', label: 'Assignment probability' },
  { name: 'conflict', label: 'Assignment conflict', extra: '0 = no conflicts' },
  { name: 'Date range' },
  { name: 'Days since last sampling' },
  { name: 'Most common countries' },
  { name: 'Number of taxa' },
  { name: 'status', label: 'Status' },
  {
    name: 'pangoLEARN_version',
    label: 'pangoLEARN version',
    render: (x) => <kbd>{x}</kbd>,
  },
  {
    name: 'pango_version',
    label: 'Pango version',
    render: (x) => <kbd>{x}</kbd>,
  },
  {
    name: 'pangolin_version',
    label: 'Pangolin version',
    render: (x) => <kbd>{x}</kbd>,
  },
  { name: 'note', label: 'Note' },
];
