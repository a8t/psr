import React from 'react';
import styled from 'react-emotion';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import Header from './Header';
import './styles.scss';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  margin-top: 3rem;

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    margin-top: 3rem;
  }
`;

const MaxWidth = styled('div')`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;
const LeftSideBarWidth = styled('div')`
  width: 300px;
  margin-right: 16px;
`;
const RightSideBarWidth = styled('div')`
  width: 224px;
`;
const Layout = ({ children, location }) => (
  <MDXProvider components={mdxComponents}>
    <Header location={location} />

    <Wrapper>
      <LeftSideBarWidth className={'d-none d-md-block'}>
        <Sidebar location={location} />
      </LeftSideBarWidth>
      <Content>
        <MaxWidth>{children}</MaxWidth>
      </Content>
      <RightSideBarWidth className={'d-none d-md-block'}>
        <RightSidebar location={location} />
      </RightSideBarWidth>
    </Wrapper>
  </MDXProvider>
);

export default Layout;
