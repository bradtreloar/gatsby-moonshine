import * as React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import Root from "../components/Root";
import Main from "../components/Main";
import Nav, { NavItemProps } from "../components/Nav";
import Navbar from "../components/Navbar";

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  allMenuItem: {
    nodes: NavItemProps[];
  };
}

const IndexLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
        allMenuItem {
          nodes {
            menu
            title
            url
            weight
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => {
      function menuItems(name: string) {
        return data.allMenuItem.nodes.filter(
          menuItem => menuItem.menu === name
        );
      }

      const navBarHeight = "62px";

      return (
        <Root>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: "description",
                content: data.site.siteMetadata.description
              },
              { name: "keywords", content: data.site.siteMetadata.keywords }
            ]}
          />
          <Navbar className="bg-dark fixed-top">
            <Nav className="navbar-nav" menuItems={menuItems("main")} />
          </Navbar>
          <Main style={{ paddingTop: navBarHeight }}>{children}</Main>
        </Root>
      );
    }}
  />
);

export default IndexLayout;
