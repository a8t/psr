import { MdxEdge, UrlTreeNode } from './types';
import config from '../../../config';

/**
 * This function selects a field from an MdxEdge
 * @param param0 an MdxEdge
 * @param fieldToSelect the fields of an MdxEdge node
 */
function selectField(
  { node: { fields } }: MdxEdge,
  fieldToSelect: keyof MdxEdge['node']['fields']
) {
  return fields[fieldToSelect];
}

/**
 * Checks if an MdxEdge has a path value of '/'
 * @param edge The MdxEdge to check
 */
function isNotIndex(edge: MdxEdge): boolean {
  return selectField(edge, 'path') !== '/';
}

/**
 * If required, filter the index element out of the input edges
 * @param edges An array of MdxEdges
 */
export function filterIndexIfRequired(edges: Array<MdxEdge>): Array<MdxEdge> {
  return config.sidebar.ignoreIndex ? edges.filter(isNotIndex) : edges;
}

type UrlNodeData = MdxEdge['node']['fields'];

/**
 * Does what it says on the box. Map MdxEdges SluggdDataNodes
 * @param edges input edges
 */
function convertMdxEdgesIntoUrlDataNodes(
  edges: Array<MdxEdge>
): Array<UrlNodeData> {
  return edges.map((edge: MdxEdge) => {
    return {
      path: selectField(edge, 'path'),
      title: selectField(edge, 'title'),
    };
  });
}

/**
 * Sorts SluggedData by length ie how deep in the tree it is
 * @param sluggedData
 */
function sortUrlNodeDataByLength(urlNodeData: Array<UrlNodeData>) {
  return urlNodeData.slice().sort(({ path: pathA }, { path: pathB }) => {
    return pathA.split('/').length - pathB.split('/').length;
  });
}

/**
 * Isolates an item at a given index from an array of items
 * @param inputArray
 * @param index
 */
function isolateItemAtIndex<T>(
  inputArray: Array<T>,
  index: number
): { head: Array<T>; itemAtIndex: T; tail: Array<T> } {
  return {
    head: inputArray.slice(0, index),
    itemAtIndex: inputArray[index],
    tail: inputArray.slice(index + 1, inputArray.length),
  };
}

/**
 * Replace an item in an array using a relace function
 * @param array
 * @param indexToReplace
 * @param replacerFunction
 */
function replaceItemAtIndex<T>(
  array: Array<T>,
  indexToReplace: number,
  replacerFunction: (T: T) => T
) {
  return array.map((currentItem, indexOfCurrentItem) =>
    indexOfCurrentItem === indexToReplace
      ? replacerFunction(currentItem)
      : currentItem
  );
}

const createUrlNode = ({ path, title, childNodes = [] }: UrlTreeNode) => ({
  path,
  title,
  childNodes,
});

const findIndexOfPath = (
  urlTreeNodes: Array<UrlTreeNode>,
  searchPath: string
): number =>
  urlTreeNodes.findIndex(({ path }) => {
    return path.includes(searchPath);
  });

const addNodeToTree = (
  siblings: Array<UrlTreeNode>,
  { path, title }: UrlNodeData,
  depth = 1
): Array<UrlTreeNode> => {
  // find if the node's siblings has an entry for the head of the current slug at this depth
  const [pathHead] = path.split('/').slice(depth, -1);
  const indexOfHead = findIndexOfPath(siblings, pathHead);

  // if a sibling does have the child we want, repeat the process inside the child
  if (pathHead !== '' && indexOfHead > -1) {
    return replaceItemAtIndex(
      siblings,
      indexOfHead,
      ({ path: thisPath, title: thisTitle, childNodes }) =>
        createUrlNode({
          path: thisPath,
          title: thisTitle,
          childNodes: addNodeToTree(childNodes, { path, title }, depth + 1),
        })
    );
  }
  // if not, add the node as a sibling
  return [...siblings, createUrlNode({ path, title, childNodes: [] })];
};

export function treeify(edges: Array<MdxEdge>): UrlTreeNode {
  // sort it first so that we place the ones closest to root first
  const sortedUrlData = sortUrlNodeDataByLength(
    convertMdxEdgesIntoUrlDataNodes(edges)
  );

  return {
    path: '',
    title: '',
    childNodes: sortedUrlData.reduce((previousTree, currentUrlData) => {
      return addNodeToTree(previousTree, currentUrlData, 1);
    }, []),
  };
}

export function sortTreeData(tree: UrlTreeNode): UrlTreeNode {
  if (tree.childNodes.length === 0) {
    return tree;
  }

  const sortedChildNodes = tree.childNodes
    .slice()
    .sort(({ path: pathA }, { path: pathB }) => pathA.localeCompare(pathB));

  return {
    ...tree,
    childNodes: sortedChildNodes.map(({ childNodes, ...rest }) => {
      return {
        ...rest,
        childNodes: childNodes
          .slice()
          .sort(({ path: pathA }, { path: pathB }) =>
            pathA.localeCompare(pathB)
          ),
      };
    }),
  };
}
