import { connect as baseConnect } from 'react-refetch';

import Markdown from 'markdown-to-jsx';

import { Link } from 'react-router-dom';

import { Error, Loading } from 'components';

import './Help.css';

const connect = baseConnect.defaults({
  handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return response.text().then((text) => Promise.reject(new Error(text)));
    }
  },
});

function MyA({ href, ...props }) {
  if (href && href.startsWith('./')) {
    const inthref = href.endsWith('.md')
      ? href.slice(2, href.length - 3)
      : href.slice(2);
    return <Link to={`/help/${inthref}`} {...props} />;
  }
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={href} {...props} />;
}

const options = {
  overrides: { a: MyA },
};
function HelpPage({ md }) {
  if (md.pending) return <Loading />;
  if (md.rejected) return <Error reason={md.reason} />;
  return (
    <Markdown options={options} className="malvirus-help">
      {md.value}
    </Markdown>
  );
}

function buildHelpPage(md) {
  return connect(() => ({ md }))(HelpPage);
}

export default buildHelpPage;
