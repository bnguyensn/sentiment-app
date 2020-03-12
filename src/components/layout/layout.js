/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import './layout.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <main style={{}}>
        {children}
        <footer
          style={{
            margin: '.5rem',
            padding: '.5rem',
            textAlign: 'center',
            color: 'inherit',
          }}
        >
          <p>
            Made with 🥰 by{' '}
            <a
              href="https://twitter.com/bnguyensn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Binh Nguyen</b>
            </a>{' '}
            and <b>Alvin Wang</b> | {`${new Date(Date.now()).getFullYear()}`}
          </p>
          <p>
            Source code is on{' '}
            <a
              href="https://github.com/bnguyensn/sentiment-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
          <p></p>
        </footer>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
