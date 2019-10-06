const path = require('path');
const startCase = require('lodash.startcase');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: { $components: path.resolve(__dirname, 'src/components') },
    },
  });

  if (stage === 'develop') {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
    });
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    createNodeField({
      name: `originalPath`,
      node,
      value: `/${
        parent.name === 'index'
          ? parent.relativeDirectory
          : [parent.relativeDirectory, parent.name].filter(Boolean).join('/')
      }`,
    });

    createNodeField({
      name: `path`,
      node,
      value: `/${
        parent.name === 'index'
          ? parent.relativeDirectory
          : [parent.relativeDirectory, parent.name].filter(Boolean).join('/')
      }`.replace(/\/[0-9]+-/g, '/'),
    });

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name),
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const {
    data: { allMdx },
  } = await graphql(
    `
      {
        allMdx(sort: { fields: fields___path }) {
          edges {
            node {
              fields {
                id
                path
                originalPath
              }
            }
          }
        }
      }
    `
  );

  // Create blog posts pages.
  allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.path,
      component: path.resolve('./src/templates/docs.js'),
      context: {
        id: node.fields.id,
      },
    });
  });
};
