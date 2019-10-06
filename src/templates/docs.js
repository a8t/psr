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

  const nav = allMdx.edges
    .map(({ node }) => node.fields.url)
    .filter(url => url !== '/')
    .sort()
    .map(url => {
      if (url) {
        const { node } = allMdx.edges.find(
          ({ node }) => node.fields.url === url
        );

        return { title: node.fields.title, url: node.fields.url };
      }
    });

  // meta tags
  const { metaTitle, metaDescription } = mdx.frontmatter;
  const canonicalUrl = `${config.gatsby.siteUrl}/${mdx.fields.url}`;

  const pageTitle = metaTitle || title;
  const pageDescription = metaDescription || description;

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
        <NextPrevious mdx={mdx} nav={nav} />
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
    allMdx {
      edges {
        node {
          fields {
            path
            title
          }
        }
      }
    }
  }
`;
