export interface MdxEdge {
  node: {
    fields: {
      slug: string;
      title: string;
    };
  };
}

export interface UrlTreeNode {
  slug: string;
  parentSlug: string;
  title: string;
  childNodes: Array<UrlTreeNode>;
}
