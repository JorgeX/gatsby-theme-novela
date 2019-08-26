"use strict";

const crypto = require(`crypto`);

// Create fields for post slugs and source
// This will change with schema customization with work
module.exports = ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const { createNode, createNodeField, createParentChildLink } = actions;
  const contentPath = themeOptions.contentPath || "content/posts";
  const basePath = themeOptions.basePath || "/";

  function slugify(str) {
    const slug = str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/");
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode && fileNode.sourceInstanceName;

  if (node.internal.type === `AuthorsYaml`) {
    const slug = node.slug ? `/${node.slug}` : slugify(node.name);

    const fieldData = {
      ...node,
      authorsPage: themeOptions.authorsPage || false,
      slug: `/authors${slug}`,
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Author`),
      parent: node.id,
      children: [],
      internal: {
        type: `Author`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Author`,
      },
    });

    createParentChildLink({ parent: fileNode, child: node });

    return;
  }

  if (node.internal.type === `Mdx` && source === contentPath) {
    const fieldData = {
      author: node.frontmatter.author,
      date: node.frontmatter.date,
      hero: node.frontmatter.hero,
      secret: node.frontmatter.secret || false,
      slug: slugify(node.frontmatter.slug || node.frontmatter.title),
      title: node.frontmatter.title,
      subscription: node.frontmatter.subscription !== false,
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Article`),
      parent: node.id,
      children: [],
      internal: {
        type: `Article`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Article Posts`,
      },
    });

    createParentChildLink({ parent: fileNode, child: node });
  }

  if (node.internal.type === `ContentfulAuthor`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/authors${slugify(node.name)}`,
    });

    createNodeField({
      node,
      name: `authorsPage`,
      value: themeOptions.authorsPage || false,
    });
  }
};
