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
