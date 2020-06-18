import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { FluidObject } from "gatsby-image";

import "../styles/components/backdrop.scss";

interface BackdropProps {
  className?: string;
  image?: string;
}

interface ImageFileProps {
  name: string;
  childImageSharp: {
    fluid: FluidObject;
  };
}

interface BackdropQueryProps {
  allFile: {
    files: ImageFileProps[];
  };
}

const Backdrop: React.FC<BackdropProps> = ({ image, children, className }) => {
  const data: BackdropQueryProps = useStaticQuery(graphql`
    query BackdropQuery {
      allFile(filter: { relativePath: { regex: "/^images/.+$/" } }) {
        files: nodes {
          name
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  const imageFile = data.allFile.files.filter(file => file.name === image)[0];
  const imageData = imageFile.childImageSharp.fluid;

  return (
    <BackgroundImage
      Tag="div"
      className={className}
      fluid={imageData}
      backgroundColor="#040e18"
    >
      {children}
    </BackgroundImage>
  );
};

export default Backdrop;
