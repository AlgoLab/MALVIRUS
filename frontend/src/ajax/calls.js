import { api } from 'app-config';

import { connect } from './utils';

const calls = {
  url: api.call(),
  force: true,
  refreshing: true,
};

const ajaxCalls = connect(() => ({
  calls,
  reloadCalls: () => ({
    calls,
  }),
}));

export default ajaxCalls;
