import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Layout, Link } from '$components';
import NextPrevious from '../components/NextPrevious';
import config from '../../config';

const forcedNavOrder = config.sidebar.forcedNavOrder;

export default function MDXRuntime({ data, location }) {
  const {
    allMdx,
    mdx,
    site: {
      siteMetadata: { title, description },
    },
  } = data;

  const { next, previous } = allMdx.edges.filter(
    ({ node }) => node.fields.id === mdx.fields.id
  )[0];

  // meta tags
  const { metaTitle, metaDescription } = mdx.frontmatter;
  const pageTitle = metaTitle || title;
  const pageDescription = metaDescription || description;
  const canonicalUrl = `${config.gatsby.siteUrl}${mdx.fields.path}`;

  return (
    <Layout location={location}>
      <Helmet>
        {/* title */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        {/* description */}
        <meta name="description" content={pageDescription} />
        <meta property="og:description" content={pageDescription} />
        <meta property="twitter:description" content={pageDescription} />
        {/* canonical url */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <h1 className={'titleWrapper'}>{mdx.fields.title}</h1>
      <main className={'mainWrapper'}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </main>
      <div className={'addPaddTopBottom'}>
        <NextPrevious next={next} previous={previous} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        path
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
      }
    }
    allMdx(sort: { fields: fields___originalPath }) {
      edges {
        node {
          fields {
            id
            path
            title
          }
        }
        next {
          fields {
            path
            title
          }
        }
        previous {
          fields {
            path
            title
          }
        }
      }
    }
  }
`;
