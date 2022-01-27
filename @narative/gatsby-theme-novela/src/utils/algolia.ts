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
            slug
            title
          }
        }
      }
    }`,
    transformer: ({ data }) => data.allArticle.edges.map(pageToAlgoliaRecord),
    indexName: 'posts',
    settings: { attributesToSnippet: [`excerpt:30`] },
  },
];
module.exports = queries;
