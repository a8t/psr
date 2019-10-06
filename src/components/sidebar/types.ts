export interface MdxEdge {
  node: {
    fields: {
      path: string;
      title: string;
    };
  };
}

export interface UrlTreeNode {
  path: string;
  title: string;
  childNodes: Array<UrlTreeNode>;
}
