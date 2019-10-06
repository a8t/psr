import React from 'react';
import Tree from './tree';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { treeify, filterIndexIfRequired, sortTreeData } from './utils';

const Sidebar = styled.nav`
  width: 100%;
  margin-right: 16px;
  height: 100vh;
  @media only screen and (min-width: 768px) {
    max-width: 300px;
  }

  /* overflow: auto; */
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #372476;
  color: #333;
  background: white;

  > ul {
    margin-top: 32px;
    min-width: 150px;
    overflow: hidden;
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

const SidebarLayout = ({ className, location, onLinkClick }) => {
  const { allMdx } = useStaticQuery(query);

  const { title, urlPathSegment, childNodes } = sortTreeData(
    treeify(filterIndexIfRequired(allMdx.edges))
  );
  return (
    <Sidebar className={className}>
      <ul>
        {childNodes.map(({ title, slug, childNodes }) => (
          <Tree
            key={title}
            onLinkClick={onLinkClick}
            title={title}
            slug={slug}
            parentUrl=""
            childNodes={childNodes}
            location={location}
          />
        ))}
      </ul>
    </Sidebar>
  );
};
export default SidebarLayout;
