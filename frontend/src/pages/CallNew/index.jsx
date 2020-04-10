import ajaxVcfs from 'ajax/vcfs';
import ajaxCreateCall from 'ajax/createCall';

import CallNew from './CallNew';

export default ajaxVcfs(ajaxCreateCall(CallNew));
