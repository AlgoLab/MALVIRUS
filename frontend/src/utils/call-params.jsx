import React from 'react';

import { Link } from 'react-router-dom';

const params = {
  vcf: {
    label: 'Reference VCF',
    extra: 'This is the reference VCF that MALVA will use to call variants.',
    render: (value) => <Link to={`/vcf/${value}`}>details</Link>,
  },
  cores: {
    label: 'Number of cores',
    extra:
      'The number of cores that can be used during the variant calling job.',
  },
  minocc: {
    label: 'Minimum number of occurrences',
    extra:
      'This is the lower threshold used to count kmers.  Kmers that appear less than this number of times will be removed from the input.',
  },
  maxocc: {
    label: 'Maximum number of occurrences',
    extra:
      'This is the upper threshold used to count kmers.  Kmers that appear more than this number of times will be removed from the input.',
  },
  lenkmers: {
    label: (
      <>
        <i>k</i>-mer length
      </>
    ),
    extra:
      'Length of the kmers that will be used by the tools.  A higher value will help to discern better between small repeated regions but will lower the occurrences of each kmer.',
  },
  maxmem: {
    label: 'Maximum amount of memory used by KMC [GB]',
    extra:
      'Maximum GB of memory used by KMC.  This value must be smaller than the amount of RAM available on your machine.',
  },
};

export default params;
