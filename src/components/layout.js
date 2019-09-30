import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import Header from './Header';
import './styles.scss';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0px 48px;
  padding-top: 3rem;
  max-width: 45em;
  width: 100%;
  min-width: 30em;
  margin-right: auto;

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    padding: 0 16px;
    padding-top: 3rem;
  }
`;

const Layout = ({ children, location }) => (
  <MDXProvider components={mdxComponents}>
    <Header location={location} />

    <Wrapper>
      <Sidebar className="d-none d-md-block" location={location} />
      <Content>{children}</Content>
      <RightSidebar className={'d-none d-lg-block'} location={location} />
    </Wrapper>
  </MDXProvider>
);

export default Layout;
