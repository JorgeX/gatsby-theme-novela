import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import AuthorHero from "../sections/author/Author.Hero";
import AuthorArticles from "../sections/author/Author.Articles";

function ArticlesPage({ location, pageContext }) {
  const author = pageContext.additionalContext.author;
  const articles = pageContext.group;

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <Section narrow>
        <AuthorHero author={author} />
        <AuthorArticles articles={articles} />
        <Paginator {...pageContext} />
      </Section>
      <ArticlesGradient />
    </Layout>
  );
}

export default ArticlesPage;

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: background 0.25s ease;
`;
