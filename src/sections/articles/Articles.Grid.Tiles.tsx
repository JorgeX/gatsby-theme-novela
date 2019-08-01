import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { Link } from "gatsby";

import Heading from "@components/Heading";
import Media from "@components/Media/Media.Img";

import mediaqueries from "@styles/media";

import { IArticleNode } from "@typings";

/**
 *  [LONG], [SHORT]
 *  [SHORT], [LONG]
 *  [SHORT], [LONG]
 */

/**
 * Okay, I know, the Grid is manually setup and we're manually selecting an
 * index from the array of articles... but it's only 8 and it works perfectly fine.
 *
 * TODO: Figure out CSS grid for reverse grid row items and inserting a quote inside.
 */
function ArticlesGridTiles({ articles }: { articles: IArticleNode[] }) {
  if (!articles) return null;

  return (
    <>
      <Grid>
        <GridItem article={articles[0]} />
        <GridItem article={articles[1]} narrow />
      </Grid>

      {articles[2] && (
        <Grid reverse>
          <GridItem article={articles[2]} narrow />
          <GridItem article={articles[3]} />
        </Grid>
      )}

      {articles[4] && (
        <Grid>
          <GridItem article={articles[4]} />
          <GridItem article={articles[5]} narrow />
        </Grid>
      )}

      {articles[6] && (
        <Grid>
          <GridItem article={articles[6]} narrow />
          <GridItem article={articles[7]} />
        </Grid>
      )}
    </>
  );
}

export default ArticlesGridTiles;

const GridItem = ({ article, narrow }) => {
  if (!article) return null;
  article = article.node;

  const hasOverflow = narrow && article.title.length > 35;

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item>
        <Image narrow={narrow}>
          <Media
            src={
              narrow ? article.hero.narrow.fluid : article.hero.regular.fluid
            }
          />
        </Image>
        <Title dark hasOverflow={hasOverflow}>
          {article.title}
        </Title>
        <Excerpt narrow={narrow} hasOverflow={hasOverflow}>
          {article.excerpt}
        </Excerpt>
        <MetaData>
          {article.date} · {article.timeToRead} min read
        </MetaData>
      </Item>
    </ArticleLink>
  );
};

const wide = "1fr";
const narrow = "457px";
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

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${p =>
    p.reverse ? `${narrow} ${wide}` : `${wide} ${narrow}`};
  grid-template-rows: 2;
  column-gap: 30px;
  margin-bottom: 80px;

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    margin-bottom: 0;
  `}
`;

const Image = styled.div`
  position: relative;
  height: 280px;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: 30px;
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
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`;

const Item = styled.div`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  @media (max-width: 540px) {
    background: ${p => p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

const Title = styled(Heading.h2)`
  font-size: 21px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: ${p => (p.hasOverflow ? "45px" : "10px")};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.tablet`
    font-size: 24px;  
    margin-bottom: 15px;
  `}

  ${mediaqueries.phablet`
    font-size: 22px;  
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.grey};
  display: ${p => (p.hasOverflow ? "none" : "box")};
  max-width: ${p => (p.narrow ? "415px" : "515px")};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    margin-bottom; 15px;
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
  border-radius: 5px;
  z-index: 1;
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
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${Image} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
