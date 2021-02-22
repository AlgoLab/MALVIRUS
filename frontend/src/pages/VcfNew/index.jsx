import { lazy } from 'react';

import ajaxCreateVcf from 'ajax/createVcf';
import ajaxRefs from 'ajax/refs';

const VcfNew = lazy(() => import('./VcfNew'));

export default ajaxRefs(ajaxCreateVcf(VcfNew));
