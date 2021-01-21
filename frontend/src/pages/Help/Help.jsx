import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import { Row, Col } from 'antd';

import { basepath } from 'app-config';

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
const Help = buildHelpPage(`${basepath}help/README.md`);
const HelpInstall = buildHelpPage(`${basepath}help/INSTALL.md`);
const HelpUsage = buildHelpPage(`${basepath}help/USAGE.md`);
const HelpTutorial = buildHelpPage(`${basepath}help/TUTORIAL.md`);
// END: List of pages

const gutter = { xs: 8, sm: 16, md: 24, lg: 32 };
const indexSpan = { sm: 8, md: 6, lg: 4 };
const pageSpan = { sm: 16, md: 18, lg: 20 };

function MenuLink({ to, children }) {
  return (
    <li>
      <NavLink activeClassName="active-menu-link" to={to}>
        {children}
      </NavLink>
    </li>
  );
}

function HelpPage() {
  return (
    <Row gutter={gutter}>
      <Col {...indexSpan}>
        <h1>Help</h1>
        <ul style={{ paddingLeft: 20 }}>
          <MenuLink to="HELP">Home</MenuLink>
          <MenuLink to="INSTALL">Installation instructions</MenuLink>
          <MenuLink to="USAGE">Usage</MenuLink>
          <MenuLink to="TUTORIAL">Tutorial</MenuLink>
        </ul>
      </Col>
      <Col {...pageSpan}>
        <Routes>
          {/* List of routes */}
          <Route path="/" element={<Help />} />
          <Route path="/HELP" element={<Help />} />
          <Route path="/INSTALL" element={<HelpInstall />} />
          <Route path="/USAGE" element={<HelpUsage />} />
          <Route path="/TUTORIAL" element={<HelpTutorial />} />
          {/* END: List of routes */}
          <Route path="*" element={<Help />} />
        </Routes>
      </Col>
    </Row>
  );
}

export default HelpPage;
