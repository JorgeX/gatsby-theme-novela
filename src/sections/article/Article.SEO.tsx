import React from "react";

import SEO from "@components/SEO";

import { IArticleNode, IAuthorNode } from "@typings";

function ArticleSEO({
  article,
  author,
  location,
}: {
  article: IArticleNode;
  author: IAuthorNode;
  location: any;
}) {
  const microdata = `{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${location.href}"
    },
    "headline": "${article.title}",
    "image": "${article.hero.seo.fixed.src}",
    "datePublished": "${article.dateForSEO}",
    "author": {
      "@type": "Person",
      "name": "${author.name}"
    },
    "description": "${article.excerpt.replace(/"/g, '\\"')}"
  }
`.replace(/\s/g, "");

  return (
    <SEO
      title={article.title}
      description={article.excerpt}
      image={article.hero.seo.fixed.src}
      timeToRead={article.timeToRead}
      published={article.date}
      pathname={location.href}
    >
      <script type="application/ld+json">{microdata}</script>
    </SEO>
  );
}

export default ArticleSEO;
