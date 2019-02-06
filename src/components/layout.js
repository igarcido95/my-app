import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import Footer from "./Footer";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulLink(sort: { fields: [createdAt], order: ASC }) {
          edges {
            node {
              title
              url
              createdAt
            }
          }
        }
      }
    `}
    
    render={data => (
      <>
          <Header></Header>
          <main>{children}</main>
          <Footer data={data}>
            Backgrounds made in Cinema 4D, iOS app in Swift, site in React. Email us to ask anything.
          </Footer>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>      
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout




