import React, { Suspense } from 'react';

import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  BarsOutlined,
  DiffFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import AppIcon from '@2fd/ant-design-icons/lib/ShuffleVariant';

import Loading from './components/Loading';
import VcfList from './pages/VcfList';
import Vcf from './pages/Vcf';
import VcfNew from 'pages/VcfNew';
import VcfUpload from 'pages/VcfUpload';
import CallList from './pages/CallList';
import Call from './pages/Call';
import CallReport from './pages/CallReport';
import CallNew from './pages/CallNew';
import Help from './pages/Help';

import './App.css';

const { Header, Content, Footer } = Layout;

const helpStyle = { float: 'right' };

function App() {
  const { pathname } = useLocation();
  const idx = pathname.indexOf('/', 1);
  const prefix = idx === -1 ? pathname : pathname.substr(0, idx);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <AppIcon /> MALVIRUS
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[prefix]}>
          <Menu.Item key="/calls">
            <Link to="/calls">
              <DiffFilled /> Variant calls
            </Link>
          </Menu.Item>
          <Menu.Item key="/vcf">
            <Link to="/vcf">
              <BarsOutlined /> Reference VCFs
            </Link>
          </Menu.Item>
          <Menu.Item key="/help" style={helpStyle}>
            <Link to="/help">
              <QuestionCircleOutlined /> Help
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="vcf" element={<VcfList />} />
              <Route path="vcf/new" element={<VcfNew />} />
              <Route path="vcf/upload" element={<VcfUpload />} />
              <Route path="vcf/:id" element={<Vcf />} />
              <Route path="calls" element={<CallList />} />
              <Route path="calls/new" element={<CallNew />} />
              <Route path="calls/:id" element={<Call />} />
              <Route path="calls/:id/report" element={<CallReport />} />
              <Route path="help/*" element={<Help />} />
              <Route path="*" element={<Navigate to="calls" />} />
            </Routes>
          </Suspense>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        MALVIRUS ©2020 - <a href="https://algolab.eu/">BIAS Lab</a>
      </Footer>
    </Layout>
  );
}

export default App;
