import React, { useState } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';

import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import { UrlTreeNode } from './types';
import { WindowLocation } from '@reach/router';

const TreeItem = styled.li`
  list-style: none;
  padding: 0;

  > header {
    display: flex;
    flex-direction: row;
    width: 100%;

    > a {
      color: #333;
      text-decoration: none !important;
      display: inline-block;
      position: relative;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      padding: 7px 10px 7px 7px;

      &.active {
        background-color: #e0cff1;
        color: #542683;
      }
    }

    > .collapser {
      background: transparent;
      border: none;
      outline: none;
      position: relative;
      padding: 8px;
      margin-left: 2px;

      svg > path {
        stroke: #d9c6ec;
        fill: #ddd;
        stroke-linecap: round;
      }
    }

    & *:hover {
      background-color: #ede3f7;
      color: #542683;
      & svg > path {
        fill: #663399;
      }
    }
  }

  :not(.isLeaf) & {
    margin-left: 16px;
    border-left: 1px solid #ddd;
  }
`;
const Tree = ({
  onLinkClick,
  title,
  slug,
  parentSlug,
  childNodes,
  location,
}: {
  onLinkClick: () => void;
  title: string;
  slug: string;
  parentSlug: string;
  childNodes: Array<UrlTreeNode>;
  location: WindowLocation;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  const url = parentSlug + slug;

  const active = location && location.pathname === url;

  const isLeaf = childNodes.length === 0;

  const calculatedClassName = `${isLeaf ? 'isLeaf' : ''}`;

  return (
    <TreeItem className={calculatedClassName}>
      <header>
        <Link to={url} onClick={onLinkClick} className={active ? 'active' : ''}>
          {title}
        </Link>
        {title && !isLeaf && (
          <button
            onClick={toggle}
            className="collapser"
            aria-label="toggle subtree"
          >
            {collapsed ? <ClosedSvg /> : <OpenedSvg />}
          </button>
        )}
      </header>

      {!collapsed && !isLeaf && (
        <ul>
          {childNodes.map(({ title, slug: childSlug, childNodes }) => (
            <Tree
              key={title}
              onLinkClick={onLinkClick}
              title={title}
              slug={childSlug}
              childNodes={childNodes}
              parentSlug={url}
              location={location}
            />
          ))}
        </ul>
      )}
    </TreeItem>
  );
};

export default Tree;
