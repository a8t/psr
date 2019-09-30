import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const RightSideBarWrapper = styled.aside`
  overflow: auto;
  position: fixed;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 32px;

  margin-top: 32px;
  padding-left: 8px;
  padding-right: 8px;
  border-left: 2px solid;
  border-left-color: rgba(230, 236, 241, 0.7);
  height: 100%;

  min-width: 160px;
  max-width: 224px;

  @media only screen and (min-width: 1023px) {
    max-width: 424px;
  }

  header {
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 7px 0px 7px 0px;
    color: #9daab6;
  }

  ul {
    margin: 0;
    li {
      list-style-type: none;
      a {
        font-size: 12px;
        font-weight: 500;
        line-height: 1.5;
        padding: 7px 16px 7px 0px;

        width: 100%;

        color: #5c6975;
        text-decoration: none;
        display: block;
        position: relative;

        &:hover {
          color: rgb(116, 76, 188) !important;
        }
      }
    }
  }
`;

const query = graphql`
  query {
    allMdx {
      edges {
        node {
          fields {
            slug
          }
          tableOfContents
        }
      }
    }
  }
`;

const SidebarLayout = ({ location, className }) => {
  const { allMdx } = useStaticQuery(query);

  const navItems = allMdx.edges
    .filter(({ node }) => node.fields.slug === location.pathname)
    .map(({ node }) => {
      if (node.tableOfContents.items) {
        return node.tableOfContents.items.map(({ title, url }) => (
          <li key={url}>
            <a href={url}>{title}</a>
          </li>
        ));
      }

      return false;
    })
    .filter(Boolean); // filter falses

  return (
    navItems.length > 0 && (
      <RightSideBarWrapper className={className}>
        <header>CONTENTS</header>
        <ul>{navItems}</ul>
      </RightSideBarWrapper>
    )
  );
};

export default SidebarLayout;
