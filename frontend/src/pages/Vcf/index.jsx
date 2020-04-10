import React from 'react';

import { useParams } from 'react-router-dom';

import ajaxVcf from 'ajax/vcf';

import Vcf from './Vcf';

const AjaxVcf = ajaxVcf(Vcf);

function RoutedVcf() {
  const { id } = useParams();
  return <AjaxVcf id={id} />;
}

export default RoutedVcf;
