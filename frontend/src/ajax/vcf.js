import { api } from 'app-config';

import { connect } from './utils';

const ajaxVcf = connect(({ id }) => {
  const vcf = {
    url: api.vcf(id),
    force: true,
    refreshing: true,
  };
  return {
    vcf,
    reloadVcf: () => ({
      vcf,
    }),
  };
});

export default ajaxVcf;
