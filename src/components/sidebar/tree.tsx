import React, { useState } from 'react';
import { Link } from 'gatsby-link';
import _ from 'lodash';
import styled from 'styled-components';

import config from '../../../config';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import { MdxEdge, UrlTreeNode } from './types';

const selectField = (
  { node: { fields } }: MdxEdge,
  fieldToSelect: keyof MdxEdge['node']['fields']
) => fields[fieldToSelect];

const isNotIndex = (edge: MdxEdge): boolean =>
  selectField(edge, 'slug') !== '/';

const filterIndexIfRequired = (edges: Array<MdxEdge>): Array<MdxEdge> =>
  config.sidebar.ignoreIndex ? edges.filter(isNotIndex) : edges;

const treeify = (edges: Array<MdxEdge>): UrlTreeNode => {
  const sluggedData = edges.reduce(
    (accumulatedData: Array<MdxEdge['node']['fields']>, edge) => {
      return [
        ...accumulatedData,
        {
          slug: selectField(edge, 'slug'),
          title: selectField(edge, 'title'),
        },
      ];
    },
    []
  );

  const recursivelyRearrangeSluggedDataIntoTrees = (
    accumulated: Array<UrlTreeNode>,
    { slug, title }: MdxEdge['node']['fields']
  ): Array<UrlTreeNode> => {
    // slice(1) ignore the first in the result of splitting
    // because slugs start with '/' so the first character is ''
    const [head, ...tail] = slug.split('/').slice(1);

    // find if the head of the current slug
    const indexOfHead = accumulated.findIndex(({ urlPathSegment }) => {
      return urlPathSegment.includes(head);
    });

    if (indexOfHead) {
      const itemToAddChildrenTo = accumulated[indexOfHead];
      return [
        ...accumulated.slice(0, indexOfHead),
        {
          ...itemToAddChildrenTo,
          childNodes: [
            ...recursivelyRearrangeSluggedDataIntoTrees(
              itemToAddChildrenTo.childNodes,
              { slug: `/${tail.join('/')}`, title }
            ),
          ],
        },
        ...accumulated.slice(indexOfHead + 1, -1),
      ];
    }

    return [
      ...accumulated,
      {
        urlPathSegment: slug,
        title,
        childNodes: [],
      },
    ];
  };

  return {
    urlPathSegment: '',
    title: '',
    childNodes: sluggedData.reduce(
      recursivelyRearrangeSluggedDataIntoTrees,
      []
    ),
  };
};

const sortTree = (tree: UrlTreeNode): UrlTreeNode => {
  const {
    sidebar: { forcedNavOrder = [] },
  } = config;
  const tmp = [...forcedNavOrder].reverse();

  // first, sort the top level according to the sidebar config

  const treeWithTopLevelSorted = _.sortBy(tree.childNodes);
};

const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Tree = ({ tree }) => {
  const { title, urlPathSegment, childNodes } =
    // sortTreeData(
    treeify(filterIndexIfRequired(edges));
  // );

  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.gatsby.pathPrefix + url);

  const calculatedClassName = `${
    config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'
  } firstLevel item ${active ? 'active' : ''}`;

  const url = 'todo';

  const hasChildren = childNodes.length !== 0;

  return (
    <li className={calculatedClassName}>
      <Header>
        {!config.sidebar.frontLine && title && hasChildren ? (
          <button onClick={toggle} className="collapser">
            {!collapsed ? <OpenedSvg /> : <ClosedSvg />}
          </button>
        ) : null}
        <Link to={url}>{title}</Link>
      </Header>

      {!collapsed && hasChildren ? (
        <ul>
          {childNodes.map(item => (
            <TreeNode
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default Tree;

[
  { childNodes: [], url: '', title: '' },
  { childNodes: [], url: '/abc', title: 'Hello!' },
  { childNodes: [], url: '/abc/1234', title: 'Hello 1234!' },
  { childNodes: [], url: '/abc/2919', title: 'Hello!' },
  { childNodes: [], url: '/abc/1234/hello', title: '1234/hello!' },
  { childNodes: [], url: '/abc/1234/hello2', title: '1234/hello!?SDF?AF' },
  { childNodes: [], url: '/dfsav', title: 'Hello!' },
];
