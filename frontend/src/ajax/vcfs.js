import { api } from 'app-config';

import { connect } from './utils';

const vcfs = {
  url: api.vcf(),
  force: true,
  refreshing: true,
};

const ajaxVcfs = connect(() => ({
  vcfs,
  reloadVcfs: () => ({
    vcfs,
  }),
  deleteVcf: (id, resolve, reject) => ({
    deletedVcf: {
      url: api.vcf(id),
      method: 'DELETE',
      andThen: () => ({
        vcfs: {
          ...vcfs,
          then: resolve,
          catch: reject,
        },
      }),
      catch: reject,
      force: true,
    },
  }),
}));

export default ajaxVcfs;
