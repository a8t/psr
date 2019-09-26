import React, { useState } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';

import config from '../../../config';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';

const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Tree = ({
  onLinkClick,
  title,
  slug,
  parentSlug,
  childNodes,
  isFirstLevel,
  location,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  const url = parentSlug + slug;

  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.gatsby.pathPrefix + url);

  const hasChildren = childNodes.length !== 0;

  const calculatedClassName = `${
    config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'
  } ${isFirstLevel ? 'firstLevel' : ''} item `;

  return (
    <li className={calculatedClassName}>
      <Header>
        <Link to={url} onClick={onLinkClick} className={active ? 'active' : ''}>
          {title}
        </Link>
        {!config.sidebar.frontLine && title && hasChildren && (
          <button onClick={toggle} className="collapser">
            {!collapsed ? <OpenedSvg /> : <ClosedSvg />}
          </button>
        )}
      </Header>

      {!collapsed && hasChildren && (
        <ul>
          {childNodes.map(({ title, slug, parentSlug, childNodes }) => (
            <Tree
              onLinkClick={onLinkClick}
              key={title}
              title={title}
              slug={slug}
              childNodes={childNodes}
              parentSlug={parentSlug}
              isFirstLevel={false}
              location={location}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Tree;
