import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Page from "../components/Page";
import IndexLayout from "../layouts";

interface ContentTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        summary?: string;
      };
    };
  };
}

const ContentTemplate: React.SFC<ContentTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <MDXRenderer frontmatter={data.mdx.frontmatter}>
        {data.mdx.body}
      </MDXRenderer>
    </Page>
  </IndexLayout>
);

export default ContentTemplate;

export const query = graphql`
  query ContentTemplateQuery($id: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
