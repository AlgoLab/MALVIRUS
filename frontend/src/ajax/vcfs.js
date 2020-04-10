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
}));

export default ajaxVcfs;
