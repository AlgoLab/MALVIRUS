import React from 'react';

import ajaxCreateVcf from 'ajax/createVcf';
import ajaxRefs from 'ajax/refs';

const VcfUpload = React.lazy(() => import('./VcfUpload'));

export default ajaxRefs(ajaxCreateVcf(VcfUpload));
