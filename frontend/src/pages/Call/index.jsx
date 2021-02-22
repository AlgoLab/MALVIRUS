import { useParams } from 'react-router-dom';

import ajaxCall from 'ajax/call';

import Call from './Call';

const AjaxCall = ajaxCall(Call);

function RoutedCall() {
  const { id } = useParams();
  return <AjaxCall id={id} />;
}

export default RoutedCall;
