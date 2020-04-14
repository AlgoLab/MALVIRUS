import { api } from 'app-config';

import { connect } from './utils';

const ajaxCreateVcf = connect(() => ({
  createVcf: (files, params, resolve, reject) => {
    const body = new FormData();
    Object.keys(files).forEach((key) =>
      body.append(key, files[key][0].originFileObj)
    );
    Object.keys(params).forEach((key) => body.append(key, params[key]));
    return {
      vcf: {
        url: api.vcf(),
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

export default ajaxCreateVcf;
