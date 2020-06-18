"use strict";

module.exports = {
  siteMetadata: {
    title: "Treloar Digital Web Development",
    description:
      "I help you create a web presence that reaches your customers with a well-designed user experience and search engine optimisation.",
    keywords: "",
    siteUrl: "https://treloardigital.com.au",
    author: {
      name: "Brad Treloar",
      url: "https://treloardigital.com.au",
      email: "brad@treloardigital.com.au"
    }
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "src/assets"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "src/content"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "src/data"
      }
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "StaticMenuItem",
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://gatsby-starter-typescript-plus.netlify.com"
      }
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        precision: 6,
      },
    }
  ]
};
