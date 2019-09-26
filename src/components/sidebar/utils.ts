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
 * Checks if an MdxEdge has a slug value of '/'
 * @param edge The MdxEdge to check
 */
function isNotIndex(edge: MdxEdge): boolean {
  return selectField(edge, 'slug') !== '/';
}

/**
 * If required, filter the index element out of the input edges
 * @param edges An array of MdxEdges
 */
export function filterIndexIfRequired(edges: Array<MdxEdge>): Array<MdxEdge> {
  return config.sidebar.ignoreIndex ? edges.filter(isNotIndex) : edges;
}

type SluggedDataNode = MdxEdge['node']['fields'] & {
  parentSlug: string;
};

/**
 * Does what it says on the box. Map MdxEdges SluggdDataNodes
 * @param edges input edges
 */
function convertMdxEdgesIntoUrlTreeNodes(edges: Array<MdxEdge>) {
  return edges.map((edge: MdxEdge) => {
    return {
      slug: selectField(edge, 'slug'),
      parentSlug: '',
      title: selectField(edge, 'title'),
    };
  });
}

/**
 * Sorts SluggedData by length
 * @param sluggedData
 */
function sortSluggedDataByLength(sluggedData: Array<SluggedDataNode>) {
  return sluggedData.slice().sort(({ slug: slugA }, { slug: slugB }) => {
    return slugA.split('/').length - slugB.split('/').length;
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

export function treeify(edges: Array<MdxEdge>): UrlTreeNode {
  const sortedSluggedData = sortSluggedDataByLength(
    convertMdxEdgesIntoUrlTreeNodes(edges)
  );

  const recursivelyRearrangeSluggedDataIntoTrees = (
    accumulated: Array<UrlTreeNode>,
    { slug, title, parentSlug }: SluggedDataNode
  ): Array<UrlTreeNode> => {
    const [slugHead, ...slugTail] = slug.split('/').slice(1);

    // find if the accumulated data has an entry for the head of the current slug
    const indexOfHead = accumulated.findIndex(({ slug: existingSlug }) => {
      return existingSlug.includes(slugHead);
    });

    if (indexOfHead > -1) {
      const {
        head,
        itemAtIndex: itemToAddChildrenTo,
        tail,
      } = isolateItemAtIndex(accumulated, indexOfHead);

      return [
        ...head,
        {
          ...itemToAddChildrenTo,
          childNodes: recursivelyRearrangeSluggedDataIntoTrees(
            itemToAddChildrenTo.childNodes,
            {
              slug: `/${slugTail.join('/')}`,
              title,
              parentSlug: '/' + slugHead,
            }
          ),
        },
        ...tail,
      ];
    }

    return [
      ...accumulated,
      {
        slug,
        parentSlug,
        title,
        childNodes: [],
      },
    ];
  };

  return {
    slug: '',
    parentSlug: '',
    title: '',
    childNodes: sortedSluggedData.reduce(
      recursivelyRearrangeSluggedDataIntoTrees,
      []
    ),
  };
}

export function sortTreeData(tree: UrlTreeNode): UrlTreeNode {
  if (tree.childNodes.length === 0) {
    return tree;
  }

  const sortedChildNodes = tree.childNodes
    .slice()
    .sort(({ slug: slugA }, { slug: slugB }) => slugA.localeCompare(slugB));

  return {
    ...tree,
    childNodes: sortedChildNodes.map(({ childNodes, ...rest }) => {
      return {
        ...rest,
        childNodes: childNodes
          .slice()
          .sort(({ slug: slugA }, { slug: slugB }) =>
            slugA.localeCompare(slugB)
          ),
      };
    }),
  };
}
