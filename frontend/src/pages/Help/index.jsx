import React from 'react';
import { Routes, Route } from 'react-router-dom';

import buildHelpPage from './buildHelpPage';

/**
 * To ADD a new PAGE:
 * 1. Add a line like the following one in the block "List of pages":
 *    const HelpSOMEID = buildHelpPage(<URL of the markdown file>);
 *    Notice: it must be a file in the /help directory
 * 2. Add a route (i.e., the simil-URL at which the page is available)
 *    like the following one in the block "List of routes":
 *    <Route path="/<URL>" element={<HelpSOMEID />} />
 *    Notice: /<URL> is automatically prefixed by /help.
 *    Notice: please keep simple (multi levels are untested, for example)
 *
 * Links between pages are possible:
 * - MUST begin with './'
 * - if they ends with '.md', '.md' is stripped off
 */

// List of pages
const Help = buildHelpPage('/help/HELP.md');
// END: List of pages

function HelpPage() {
  return (
    <Routes>
      {/* List of routes */}
      <Route path="/" element={<Help />} />
      {/* END: List of routes */}
      <Route path="*" element={<Help />} />
    </Routes>
  );
}

export default HelpPage;
