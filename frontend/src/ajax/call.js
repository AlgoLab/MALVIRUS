import { api } from 'app-config';

import { connect } from './utils';

const ajaxCall = connect(({ id }) => {
  const call = {
    url: api.call(id),
    force: true,
    refreshing: true,
  };
  return {
    call,
    reloadCall: () => ({
      call,
    }),
  };
});

export default ajaxCall;
