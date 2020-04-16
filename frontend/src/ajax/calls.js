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
  deleteCall: (id, resolve, reject) => ({
    deletedCall: {
      url: api.call(id),
      method: 'DELETE',
      andThen: () => ({
        calls: {
          ...calls,
          then: resolve,
          catch: reject,
        },
      }),
      catch: reject,
      force: true,
    },
  }),
}));

export default ajaxCalls;
