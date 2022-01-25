function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  };
}

const queries = [
  {
    query: `{
      allArticle(sort: {order: DESC, fields: date}) {
        edges {
          node {
            id
            excerpt
            date
            slug
            title
            author
          }
        }
      }
    }`,
    transformer: ({ data }) => data.allArticle.edges.map(pageToAlgoliaRecord),
    indexName: 'posts',
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];
module.exports = queries;
