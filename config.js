const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://philippinesocietyandrevolution.com',
    gaTrackingId: null,
  },
  header: {
    logo: '',
    logoLink: '/',
    title: 'Philippine Society and Revolution',
    githubUrl: '',
    helpUrl: '',
    tweetText: '',
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: ['/introduction', '/codeblock'],
    links: [{ text: 'Hasura', link: 'https://hasura.io' }],
    frontline: false,
    ignoreIndex: true,
  },
  siteMetadata: {
    title: 'Philippine Society and Revolution',
    description: '',
    ogImage: null,
    docsLocation: '',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
};

module.exports = config;
