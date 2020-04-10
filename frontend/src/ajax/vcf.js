import { api } from 'app-config';

import { connect } from './utils';

const vcf = (id) => ({
  url: api.vcf(id),
  force: true,
  refreshing: true,
});

const ajaxVcf = connect(({ id }) => ({
  vcf: vcf(id),
  reloadVcf: (id) => ({
    vcf: vcf(id),
  }),
  createVcf: (resolve, reject) => ({
    currentVcf: {
      url: api.vcf(),
      method: 'POST',
      then: resolve,
      catch: reject,
      force: true,
    },
  }),
}));

export default ajaxVcf;
