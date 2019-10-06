import React, { useState, useEffect } from 'react';
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

      &.isActive {
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
  path,
  childNodes,
  location,
}: {
  onLinkClick: () => void;
  title: string;
  path: string;
  childNodes: Array<UrlTreeNode>;
  location: WindowLocation;
}) => {
  // whether the current url will be highlighted as active
  const isActive = location && location.pathname === path;

  // whether this node is a leaf
  const isLeaf = childNodes.length === 0;

  // tree open state and effects
  const shouldSectionBeOpenAutomatically =
    isActive || location.pathname.includes(path);

  const [open, setOpen] = useState(shouldSectionBeOpenAutomatically);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    setOpen(shouldSectionBeOpenAutomatically);
  }, [location.pathname]);

  return (
    <TreeItem className={`${isLeaf ? 'isLeaf' : ''}`}>
      <header>
        <Link
          to={path}
          onClick={onLinkClick}
          className={isActive ? 'isActive' : ''}
        >
          {title}
        </Link>
        {title && !isLeaf && (
          <button
            onClick={toggle}
            className="collapser"
            aria-label="toggle subtree"
          >
            {open ? <OpenedSvg /> : <ClosedSvg />}
          </button>
        )}
      </header>

      {open && !isLeaf && (
        <ul>
          {childNodes.map(({ title, path, childNodes }) => (
            <Tree
              key={title}
              onLinkClick={onLinkClick}
              title={title}
              path={path}
              childNodes={childNodes}
              location={location}
            />
          ))}
        </ul>
      )}
    </TreeItem>
  );
};

export default Tree;
