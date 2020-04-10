import { api } from 'app-config';

import { connect } from './utils';

const ajaxCreateCall = connect(() => ({
  createCall: (sample, params, resolve, reject) => {
    const body = new FormData();
    body.append('sample', sample.originFileObj);
    Object.keys(params).forEach((key) => body.append(key, params[key]));
    return {
      call: {
        url: api.call(),
        method: 'POST',
        then: resolve,
        catch: reject,
        force: true,
        body,
        headers: {
          'Content-Type': null, // 'multipart/form-data',
        },
      },
    };
  },
}));

export default ajaxCreateCall;
