import React from "react";
import styled from "@emotion/styled";

import Image from "@components/Image";

import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import SocialLinks from "@components/SocialLinks";

interface AuthorHeroProps {
  author: IAuthor;
}

const AuthorHero = ({ author }: AuthorHeroProps) => {
  return (
    <Hero>
      <HeroImage>
        <Image src={author.avatar.full.fluid} />
      </HeroImage>
      <Heading>{author.name}</Heading>
      <Subheading>{author.bio}</Subheading>
      <div>
        <SocialLinks links={author.social} />
      </div>
    </Hero>
  );
};

export default AuthorHero;

const Hero = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 35px auto 110px;
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 164px;
  max-width: 164px;
  margin-bottom: 35px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${p => p.theme.colors.background};
  box-shadow: 0px 15.619px 31.2381px rgba(0, 0, 0, 0.15);

  ${mediaqueries.tablet`
    max-width: 146px;
    max-height: 146px;
  `}

  ${mediaqueries.phablet`
    max-width: 136px;
    max-height: 136px;
    margin-bottom: 25px;
  `}
`;

const Heading = styled.h1`
  font-size: 38px;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${p => p.theme.colors.primary};
  margin-bottom: 15px;
  font-weight: 600;

  ${mediaqueries.tablet`
  `}

  ${mediaqueries.phablet`
  `}
`;

const Subheading = styled.p`
  margin: 0 auto 35px;
  max-width: 450px;
  color: ${p => p.theme.colors.grey};
  font-size: 18px;
  font-family: ${p => p.theme.fonts.sansSerif};
  line-height: 1.4;
  text-align: center;

  ${mediaqueries.phablet`
    font-size: 14px;
  `}
`;
