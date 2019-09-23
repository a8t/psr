const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://philippinesocietyandrevolution.com',
    gaTrackingId: null,
  },
  header: {
    logo: '',
    logoLink: '/',
    title: 'PSR',
    githubUrl: '',
    helpUrl: '',
    tweetText: '',
    links: [{ text: '', link: '' }],
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
