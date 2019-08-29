module.exports = ({
  contentAuthors = "content/authors",
  contentPosts = "content/posts",
}) => ({
  mapping: {
    "Mdx.frontmatter.author": `AuthorsYaml`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: ({
          query: {
            site: { siteMetadata },
          },
          ...rest
        }) => {
          siteMetadata.feed_url = siteMetadata.siteUrl + '/rss.xml';

          return {
            ...siteMetadata,
            ...rest,
          }
        },
        feeds: [
          {
            serialize: ({ query: { site, allArticle } }) => {
              return allArticle.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  // custom_elements: [{ "content:encoded": edge.node.body }],
                  author: edge.node.author
                })
              })
            },
            query: `
              {
                allArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      author
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: 'This is broken. It cannot be set from code, only manually for now. See: https://github.com/gatsbyjs/gatsby/issues/17100'
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentPosts,
        name: contentPosts,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentAuthors,
        name: contentAuthors,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noreferrer",
            },
          },
        ],
        remarkPlugins: [require(`remark-slug`)],
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: process.env.NODE_ENV === `development`,
      },
    },
    `gatsby-plugin-theme-ui`,
  ],
});
