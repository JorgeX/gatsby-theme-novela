module.exports.local = {
  articles: ({ node: article }) => {
    return {
      ...article,
      hero: {
        full: article.hero.full.fluid,
        regular: article.hero.regular.fluid,
        narrow: article.hero.narrow.fluid,
        seo: article.hero.seo.fixed,
      },
    };
  },
  authors: ({ node: author }) => {
    return {
      ...author,
      avatar: {
        small: author.avatar.small.fluid,
        medium: author.avatar.medium.fluid,
        large: author.avatar.large.fluid,
      },
    };
  },
};

module.exports.contentful = {
  articles: ({ node: article }) => {
    const author = article.author.reduce((curr, next, index, arr) => {
      if (arr.length === 1) {
        return next.name;
      }

      return curr + next.name + ", ";
    }, ``);

    return {
      ...article,
      author,
      body: article.body.childMdx.body,
      timeToRead: article.body.childMdx.timeToRead,
    };
  },
  authors: ({ node: author }) => {
    return {
      ...author,
      social: author.social.map(s => ({ url: s })),
      slug: author.fields.slug,
      authorsPage: author.fields.authorsPage,
    };
  },
};
