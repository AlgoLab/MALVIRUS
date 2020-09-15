import { api } from 'app-config';

import { connect } from './utils';

const refs = {
  url: api.ref,
  force: true,
  refreshing: true,
};

const ajaxRefs = connect(() => ({
  refs,
  reloadRefs: () => ({
    refs,
  }),
}));

export default ajaxRefs;
