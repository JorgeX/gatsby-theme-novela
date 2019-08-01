import React from "react";
import styled from "@emotion/styled";

import Heading from "@components/Heading";
import Media from "@components/Media/Media.Img";

import mediaqueries from "@styles/media";

import { IArticleNode, IAuthor } from "@typings";

const ArticleHero = ({
  article,
  author,
}: {
  article: IArticleNode;
  author: IAuthor;
}) => {
  return (
    <Hero>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle>
          <HeroAvatar>
            <Media src={author.avatar.image.fluid} />
          </HeroAvatar>
          <strong>{author.name}</strong>
          <HideOnMobile>,&nbsp;</HideOnMobile> {article.date} ·{" "}
          {article.timeToRead} min read
        </HeroSubtitle>
      </Header>
      <Image id="ArticleImage__Hero">
        <Media src={article.hero.full.fluid} />
      </Image>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  position: relative;
`;

const HeroAvatar = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 14px;
  background: grey;
  overflow: hidden;

  ${mediaqueries.phablet`
    display: none;
  `}
`;

const Header = styled.header`
  margin: 100px auto 120px;
  padding-left: 68px;
  max-width: 680px;

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 170px auto 180px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto;
  }
`;

const HeroHeading = styled(Heading.h1)`
  font-size: 48px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const HeroSubtitle = styled.div`
  display: flex;
  font-size: 18px;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.phablet`
    font-size: 14px;
    flex-direction: column;

    strong {
      display: block;
      font-weight: semi-bold;
      margin-bottom: 5px;
    }
  `}
`;

const HideOnMobile = styled.span`
  ${mediaqueries.phablet`
    display: none;
  `}
`;
const Image = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 424px;
  max-width: 944px;
  margin: 0 auto;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2),
    0 18px 36px -18px rgba(0, 0, 0, 0.22);

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
`}
`;
