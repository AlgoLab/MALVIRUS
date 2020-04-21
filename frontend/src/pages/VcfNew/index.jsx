import React from 'react';

import ajaxCreateVcf from 'ajax/createVcf';

const VcfNew = React.lazy(() => import('./VcfNew'));

export default ajaxCreateVcf(VcfNew);
