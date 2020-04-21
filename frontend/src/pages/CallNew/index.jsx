import React from 'react';

import ajaxVcfs from 'ajax/vcfs';
import ajaxCreateCall from 'ajax/createCall';

const CallNew = React.lazy(() => import('./CallNew'));

export default ajaxVcfs(ajaxCreateCall(CallNew));
