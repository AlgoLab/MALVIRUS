import { api } from 'app-config';

import { connect } from './utils';

const ajaxCreateVcf = connect(() => ({
  createVcf: (resolve, reject) => ({
    vcf: {
      url: api.vcf(),
      method: 'POST',
      then: resolve,
      catch: reject,
      force: true,
    },
  }),
}));

export default ajaxCreateVcf;
