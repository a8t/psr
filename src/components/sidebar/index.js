import React from 'react';
import Tree from './tree';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'react-emotion';
import config from '../../../config';

const Sidebar = styled('aside')`
  width: 100%;
  /* background-color: rgb(245, 247, 249); */
  /* border-right: 1px solid #ede7f3; */
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #372476;
  /* Safari 4-5, Chrome 1-9 */
  background: linear-gradient(#372476, #3b173b);
  color: #333;
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#372476),
    to(#3b173b)
  );
  /* Safari 5.1, Chrome 10+ */
  background: white;
  @media only screen and (max-width: 767px) {
    padding-left: 0px;
  }
  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 100vh;
  }
`;

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;

const query = graphql`
  query {
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
`;

const SidebarLayout = ({ location }) => {
  const { allMdx } = useStaticQuery(query);
  return (
    <Sidebar>
      <ul className={'sideBarUL'}>
        <Tree edges={allMdx.edges} />
      </ul>
    </Sidebar>
  );
};
export default SidebarLayout;
