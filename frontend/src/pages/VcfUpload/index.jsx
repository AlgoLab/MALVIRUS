import React from 'react';

import ajaxCreateVcf from 'ajax/createVcf';

const VcfUpload = React.lazy(() => import('./VcfUpload'));

export default ajaxCreateVcf(VcfUpload);
