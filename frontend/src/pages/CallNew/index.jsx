import { lazy } from 'react';

import ajaxVcfs from 'ajax/vcfs';
import ajaxCreateCall from 'ajax/createCall';

const CallNew = lazy(() => import('./CallNew'));

export default ajaxVcfs(ajaxCreateCall(CallNew));
