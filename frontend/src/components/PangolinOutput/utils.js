export const FIELDS = [
  { name: 'lineage', label: 'Lineage', render: (x) => <b>{x}</b> },
  { name: 'probability', label: 'Assignment probability' },
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
];
