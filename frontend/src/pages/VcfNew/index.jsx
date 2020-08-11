import React from 'react';

import ajaxCreateVcf from 'ajax/createVcf';
import ajaxRefs from 'ajax/refs';

const VcfNew = React.lazy(() => import('./VcfNew'));

export default ajaxRefs(ajaxCreateVcf(VcfNew));
