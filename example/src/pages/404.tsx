import * as React from "react";
import { Link } from "gatsby";

import Page from "gatsby-theme-moonshine/src/components/Page";
import { Container } from "gatsby-theme-moonshine/src/components/Grid";
import IndexLayout from "gatsby-theme-moonshine/src/layouts";

const NotFoundPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>404: Page not found.</h1>
        <p>
          You've hit the void. <Link to="/">Go back.</Link>
        </p>
      </Container>
    </Page>
  </IndexLayout>
);

export default NotFoundPage;
