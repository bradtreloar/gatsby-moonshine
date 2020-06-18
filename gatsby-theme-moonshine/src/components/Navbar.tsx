import * as React from "react";
import { Navbar as BSNavbar, Container as BSContainer } from "react-bootstrap";
import { useStaticQuery, graphql } from "gatsby";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className, children }) => {
  const data = useStaticQuery(graphql`
    query NavbarQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(name: { eq: "logo" }) {
        publicURL
      }
    }
  `);

  return (
    <div className={className}>
      <BSContainer className="px-0">
        <BSNavbar variant="dark" expand="lg">
          <BSNavbar.Brand href="/">
            <img
              src={data.file.publicURL}
              alt={data.site.siteMetadata.title}
              height="36"
            />
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BSNavbar.Collapse
            className="justify-content-end text-right"
            id="basic-navbar-nav"
          >
            {children}
          </BSNavbar.Collapse>
        </BSNavbar>
      </BSContainer>
    </div>
  );
};

export default Navbar;
