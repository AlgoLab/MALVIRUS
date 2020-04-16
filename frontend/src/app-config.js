const wsBaseHref = process.env.REACT_APP_API_BASE;

const isNotNull = (arg) => (arg != null ? `/${arg}` : '');

export const api = {
  vcf: (idv) => {
    return `${wsBaseHref}/vcf${isNotNull(idv)}`;
  },
  call: (idm) => {
    return `${wsBaseHref}/malva${isNotNull(idm)}`;
  },
};

export const basepath = process.env.PUBLIC_URL
  ? `${process.env.PUBLIC_URL}/`
  : '/';

export const defaultMalvaParams = {
  minocc: 100,
  maxocc: 300,
  lenkmers: 35,
  maxmem: 4,
  cores: 4,
};

export const JOB_STATUSES = [
  { value: 'Completed', color: 'success' },
  { value: 'Running', color: 'processing' },
  { value: 'Failed', color: 'error' },
  { value: 'Pending', color: 'warning' },
  { value: 'Uploaded', color: 'success' },
];
