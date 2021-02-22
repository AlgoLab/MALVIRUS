import { lazy } from 'react';

import ajaxCreateVcf from 'ajax/createVcf';
import ajaxRefs from 'ajax/refs';

const VcfUpload = lazy(() => import('./VcfUpload'));

export default ajaxRefs(ajaxCreateVcf(VcfUpload));
