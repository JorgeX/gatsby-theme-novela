import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Link } from "gatsby";

import Heading from "@components/Heading";
import Media from "@components/Media/Media.Img";

import mediaqueries from "@styles/media";

import { IArticleNode } from "@typings";

/**
 * [LONG ROW]
 * [LONG ROW]
 * [LONG ROW]
 * ...
 */

function ArticlesGridRows({ articles }: { articles: IArticleNode[] }) {
  if (!articles) return null;

  return (
    <>
      {articles.map(({ node: article }) => (
        <ArticleLink to={article.slug} data-a11y="false">
          <GridRow>
            <Image>
              <Media src={article.hero.regular.fluid} />
            </Image>
            <div>
              <Title dark>{article.title}</Title>
              <Excerpt>{article.excerpt}</Excerpt>
              <MetaData>
                {article.date} · {article.timeToRead} min read
              </MetaData>
            </div>
          </GridRow>
        </ArticleLink>
      ))}
    </>
  );
}

export default ArticlesGridRows;

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const Image = styled.div`
  position: relative;
  height: 220px;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2),
    0 18px 36px -18px rgba(0, 0, 0, 0.22);
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
    height: 200px;
    margin-bottom: 35px;
  `}

  ${mediaqueries.phablet`
    margin-bottom: 0;
    box-shadow: none;
    overflow: hidden;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;

  ${mediaqueries.desktop_medium`
    grid-column-gap: 40px;
    grid-template-columns: 1fr 420px;
  `}

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  @media (max-width: 540px) {
    background: ${p => p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

const Title = styled(Heading.h2)`
  font-size: 24px;
  margin-bottom: 15px;
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.phablet`
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 15px;
  color: ${p => p.theme.colors.grey};
  display: box;

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`;

const MetaData = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${p => p.theme.colors.grey};
  opacity: 0.33;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  margin-bottom: 50px;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${Image}, &:focus ${Image} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
      0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h2,
  &:focus h2 {
    color: ${p => p.theme.colors.accent};
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -1.5%;
    top: -10%;
    width: 103%;
    height: 120%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  ${mediaqueries.phablet`
    margin-bottom: 40px;
    
    &:hover ${Image} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
