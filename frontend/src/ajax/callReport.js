import { api } from 'app-config';

import { connect, newError } from './utils';

const genericRequests = {
  headers: {
    Accept: '*/*',
  },
  handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      const copy = response.clone();
      const json = response.json();
      return json.then(
        (cause) => Promise.reject(newError(cause)),
        () => copy.text().then((text) => Promise.reject(new Error(text)))
      );
    }
  },
};

function getOutputs(value) {
  if (value && value.log && value.log.output && value.log.output) {
    return Object.fromEntries(
      Object.entries(value.log.output).map(([key, url]) => [
        key,
        {
          ...genericRequests,
          url,
        },
      ])
    );
  }
  return {
    output: {
      value: Promise.reject('Job not completed or output not found'),
    },
  };
}
const ajaxCall = connect(({ id }) => ({
  call: {
    url: api.call(id),
    force: true,
    refreshing: true,
    andThen: getOutputs,
  },
}));

export default ajaxCall;
