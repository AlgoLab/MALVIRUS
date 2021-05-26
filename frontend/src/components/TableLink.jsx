import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import TableButton from './TableButton';

function TableLink(props) {
  const navigate = useNavigate();
  const onClick = useCallback(
    (evt) => navigate(evt.currentTarget.name),
    [navigate]
  );
  return <TableButton onClick={onClick} {...props} />;
}

export default TableLink;
