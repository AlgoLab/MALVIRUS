import { lazy } from 'react';

import { useParams } from 'react-router-dom';

import ajaxCall from 'ajax/callReport';

const CallReport = lazy(() => import('./CallReport'));

const AjaxCallReport = ajaxCall(CallReport);

function RoutedCallReport() {
  const { id } = useParams();
  return <AjaxCallReport id={id} />;
}

export default RoutedCallReport;
