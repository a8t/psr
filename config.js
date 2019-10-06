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
    shortTitle: 'PSR',
    githubUrl: '',
    helpUrl: '',
    tweetText: '',
    links: [{ text: '', link: '' }],
  },
  sidebar: {
    forcedNavOrder: ['/introduction', '/codeblock'],
    links: [{ text: 'Hasura', link: 'https://hasura.io' }],
    ignoreIndex: true,
  },
  siteMetadata: {
    title: 'Philippine Society and Revolution',
    description:
      'An analysis of Philippine society, a summary of the basic problems of the Filipino people, and a discussion of the solutions.',
    ogImage: null,
    docsLocation: '',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
};

module.exports = config;
