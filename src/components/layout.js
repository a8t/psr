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
  margin: 0px 88px;
  margin-top: 3rem;
  width: 100%;

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    margin-top: 3rem;
  }
`;

const RightSideBarWidth = styled.div`
  width: 224px;
`;
const Layout = ({ children, location }) => (
  <MDXProvider components={mdxComponents}>
    <Header location={location} />

    <Wrapper>
      <Sidebar className="d-none d-md-block" location={location} />
      <Content>{children}</Content>
      <RightSideBarWidth className={'d-none d-md-block'}>
        <RightSidebar location={location} />
      </RightSideBarWidth>
    </Wrapper>
  </MDXProvider>
);

export default Layout;
