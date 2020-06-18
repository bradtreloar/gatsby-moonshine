/* eslint-disable no-console */

const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const createMenuItemNode = (menuItem, helpers) => {
  const { actions, createNodeId, createContentDigest } = helpers;
  const { createNode } = actions;
  const { menu, title, url, weight } = menuItem;

  createNode({
    id: createNodeId(`menuitem${menu}${title}${url}`),
    menu,
    title,
    url,
    weight,
    internal: {
      type: `MenuItem`,
      contentDigest: createContentDigest(``)
    }
  });
};

const createDynamicMenuItems = (menus, helpers) => {
  const { node } = helpers;

  let menuItems = menus;
  if (typeof menus === "string")
    menuItems = [
      {
        menu: menus,
        title: node.frontmatter.title,
        weight: undefined
      }
    ];

  if (!(menuItems instanceof Array)) {
    throw new Error(`menuItems is not an array.`);
  }

  menuItems.forEach(menuItem => {
    const menuName = menuItem.menu;

    createMenuItemNode(
      {
        menu: menuName,
        title: menuItem.title || node.frontmatter.title,
        url: node.fields.url,
        weight: menuItem.weight
      },
      helpers
    );
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const allMdx = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              url
            }
          }
        }
      }
    }
  `);

  if (allMdx.errors) {
    console.error(allMdx.errors);
    throw new Error(allMdx.errors);
  }

  const content = allMdx.data.allMdx.edges;
  content.forEach(({ node }) => {
    const { url } = node.fields;

    createPage({
      path: url,
      component: path.resolve(`${__dirname}/src/templates/content.tsx`),
      context: {
        id: node.id
      }
    });
  });
};

exports.onCreateNode = helpers => {
  const { node, actions, getNode } = helpers;
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const url = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: "url",
      value: url
    });

    const { menus } = node.frontmatter;
    if (menus) createDynamicMenuItems(menus, helpers);
  } else if (node.internal.type === "StaticMenuItem") {
    createMenuItemNode(node, helpers);
  }
};
