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
    extra: (
      <>
        This is the lower threshold used to count <i>k</i>-mers. <i>k</i>-mers
        that appear less than this number of times will be removed from the
        input.
        <br />
        Larger values lead to more specific calls, while smaller values lead to
        more sensitive results.
        <br />
        As rule of thumb, you set this value from the expected coverage with the
        following formula: 10000 &times; <i>expected coverage</i> &#8725;{' '}
        <i>genome length</i>.
      </>
    ),
  },
  maxocc: {
    label: 'Maximum number of occurrences',
    extra: (
      <>
        This is the upper threshold used to count <i>k</i>-mers. <i>k</i>-mers
        that appear more than this number of times will be removed from the
        input.
      </>
    ),
  },
  lenkmers: {
    label: (
      <span>
        Context <i>k</i>-mer length
      </span>
    ),
    extra: (
      <>
        Length of the <i>k</i>-mers used to discern between real signatures and
        repetitions. A higher value will help to discern better between small
        repeated regions but will lower the occurrences of each <i>k</i>-mer.
      </>
    ),
  },
  malvak: {
    label: (
      <span>
        Signature <i>k</i>-mer length
      </span>
    ),
    extra: (
      <>
        Length of the <i>k</i>-mers used to characterize each allele. A higher
        value will help to discern better between small repeated regions but
        will lower the occurrences of each <i>k</i>-mer.
      </>
    ),
  },
  maxmem: {
    label: 'Maximum amount of memory used by KMC [GB]',
    extra:
      'Maximum GB of memory used by KMC.  This value must be smaller than the amount of RAM available on your machine.',
  },
};

export default params;
