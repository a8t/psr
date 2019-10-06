import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from './link';
import config from '../../config.js';
import Sidebar from './sidebar';

const Header = ({ location }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            headerTitle
            headerShortTitle
            githubUrl
            helpUrl
            tweetText
            logo {
              link
              image
            }
            headerLinks {
              link
              text
            }
          }
        }
      }
    `}
    render={data => {
      const logoImg = require('./images/km_logo.svg');
      const twitter = require('./images/twitter.svg');
      const {
        site: {
          siteMetadata: {
            headerTitle,
            headerShortTitle,
            githubUrl,
            helpUrl,
            tweetText,
            logo,
            headerLinks,
          },
        },
      } = data;
      const finalLogoLink = logo.link !== '' ? logo.link : '/';

      const [isOpen, setIsOpen] = useState(false);

      return (
        <nav className={'navbar navbar-default navBarDefault navbar-light'}>
          <header className={'navbar-header navBarHeader'}>
            <Link to={finalLogoLink} className={'navbar-brand navBarBrand'}>
              <img className={'img-responsive'} src={logoImg} alt={'logo'} />
              <span className={'headerTitle d-none d-md-block'}>
                {headerTitle}
              </span>
              <span className={'headerTitle d-md-none'}>
                {headerShortTitle}
              </span>
            </Link>
            <button
              type="button"
              className={'navbar-toggler collapsed navBarToggle d-md-none'}
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <span className={'sr-only'}>Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
          </header>

          {isOpen && (
            <div className="d-md-none">
              <Sidebar
                onLinkClick={() => setIsOpen(false)}
                location={location}
              />
            </div>
          )}
          {/* <ul className={'nav navbar-nav navBarUL navBarNav navbar-right navBarULRight'}>
                {headerLinks.map((link, key) => {
                  if(link.link !== '' && link.text !== '') {
                    return(
                      <li key={key}>
                        <a href={link.link} target="_blank" dangerouslySetInnerHTML={{__html: link.text}} />
                      </li>
                    );
                  }
                })}
                {helpUrl !== '' ?
                  (<li><a href={helpUrl}><img src={help} alt={'Help icon'}/></a></li>) : null
                }
                {(tweetText !== '' || githubUrl !== '') ?
                  (<li className="divider hidden-xs"></li>): null
                }
                {tweetText !== '' ?
                  (<li>
                    <a href={'https://twitter.com/intent/tweet?&text=' + tweetText} target="_blank">
                      <img className={'shareIcon'} src={twitter} alt={'Twitter'} />
                    </a>
                   </li>) : null
                }
                {githubUrl !== '' ?
                  (<li className={'githubBtn'}>
                    <GitHubButton href={githubUrl} data-show-count="true" aria-label="Star on GitHub">Star</GitHubButton>
                  </li>) : null}
              </ul> */}
        </nav>
      );
    }}
  />
);

export default Header;
