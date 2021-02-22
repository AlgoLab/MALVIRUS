import { Fragment, createElement } from 'react';
import { Typography } from 'antd';

const ellipsis = { rows: 5, expandable: true };
const styleBase = {
  marginBottom: 0,
};
const styleWithHeader = {
  ...styleBase,
  display: 'inline',
};

function Description({ description, header, el }) {
  const iel = el || (header ? 'div' : Fragment);
  return createElement(
    iel,
    null,
    header && (
      <>
        <b>{header}</b>{' '}
      </>
    ),
    <Typography.Paragraph
      ellipsis={ellipsis}
      style={header ? styleWithHeader : styleBase}
    >
      {description}
    </Typography.Paragraph>
  );
}

export default Description;
