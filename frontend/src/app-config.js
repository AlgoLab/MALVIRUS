const wsBaseHref = process.env.REACT_APP_API_BASE;

const isNotNull = (arg) => (arg != null ? `/${arg}` : '');

export const api = {
  vcf: (idv) => {
    return `${wsBaseHref}/vcf${isNotNull(idv)}`;
  },
  call: (idm) => {
    return `${wsBaseHref}/malva${isNotNull(idm)}`;
  },
  update: `${wsBaseHref}/update`,
};

export const basepath = process.env.PUBLIC_URL
  ? `${process.env.PUBLIC_URL}/`
  : '/';

export const defaultMalvaParams = {
  minocc: 5,
  maxocc: 10000,
  lenkmers: 43,
  malvak: 35,
  maxmem: 4,
  cores: 4,
};

export const defaultReportConfig = {
  only_alt: true,
  mingq: 0,
};

const BASE_JOB_STATUSES = [
  { value: 'Precomputed', color: '#237804', success: true, final: true },
  { value: 'Completed', color: 'success', success: true, final: true },
  { value: 'Running', color: 'processing' },
  { value: 'Failed', color: 'error', final: true },
  { value: 'Pending', color: 'warning' },
  { value: 'Uploaded', color: 'success', success: true, final: true },
];

export const JOB_STATUSES = Object.fromEntries(
  BASE_JOB_STATUSES.map((job_status) => [job_status.value, job_status])
);
