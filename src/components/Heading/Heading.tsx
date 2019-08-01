import styled from "@emotion/styled";
import { css } from "@emotion/core";

import mediaqueries from "@styles/media";

const commonStyles = p => css`
  font-weight: 600;
  color: ${p.theme.colors.primary};
`;

/**
 * Examples:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 * <Heading.h2 styles="h1">Lorem Ipsum</Heading.h2>
 * <Heading.h3 styles="h6">Lorem Ipsum</Heading.h3>
 * <Heading.h4>Lorem Ipsum</Heading.h4>
 * <Heading.h5>Lorem Ipsum</Heading.h5>
 * <Heading.h6>Lorem Ipsum</Heading.h6>
 *
 *
 * Props:
 * <Heading.h2 styles="h1">Lorem Ipsum</Heading.h2>
 * Will generate an h2 tag with h1 styling
 */

const constants = {
  h1: {
    fontsize: "52px",
    fontsizeTablet: "38px",
    fontsizeMobile: "32px",
    lineheight: 1.15,
    lineheightMobile: 1.2,
  },
  h2: {
    fontsize: "3.2rem",
    fontsizeMobile: "2.3rem",
    fontFamily: "'Merriweather', serif",
    lineheight: 1.333,
  },
  h3: {
    fontsize: "2.4rem",
    fontFamily: "'Merriweather', serif",
    fontsizeMobile: "2.4rem",
    lineheight: 1.45,
  },
  h4: {
    fontsize: "1.8rem",
    fontsizeMobile: "1.4rem",
  },
  h5: {
    fontsize: "1.8rem",
    fontsizeMobile: "1.4rem",
  },
  h6: {
    fontsize: "1.8rem",
    fontsizeMobile: "1.4rem",
  },
};

const h1 = styled.h1`
  font-size: ${constants.h1.fontsize};
  line-height: ${constants.h1.lineheight};
  font-family: ${p => p.theme.fonts.sansSerif};
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 38px;
    line-height: ${constants.h1.lineheightMobile};
  `};

  ${mediaqueries.tablet`
    font-size: ${constants.h1.fontsizeTablet};
    line-height: ${constants.h1.lineheightMobile};
  `};

  ${mediaqueries.phablet`
    font-size: ${constants.h1.fontsizeMobile};
    line-height: ${constants.h1.lineheightMobile};
  `};
`;

const h2 = styled.h2`
  font-size: ${constants.h2.fontsize};
  line-height: ${constants.h2.lineheight};
  font-family: ${p => p.theme.fonts.serif};
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: ${constants.h2.fontsizeTablet};
    line-height: ${constants.h2.lineheightMobile};
  `};

  ${mediaqueries.phablet`
    font-size: ${constants.h2.fontsizeMobile};
    line-height: ${constants.h2.lineheightMobile};
  `};
`;

const h3 = styled.h3`
  font-size: ${constants.h3.fontsize};
  line-height: ${constants.h3.lineheight};
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: ${constants.h3.fontsizeTablet};
    line-height: ${constants.h3.lineheightMobile};
  `};

  ${mediaqueries.phablet`
    font-size: ${constants.h3.fontsizeMobile};
    line-height: ${constants.h3.lineheightMobile};
  `};
`;

const h4 = styled.h4`
  font-size: ${constants.h4.fontsize};
  line-height: ${constants.h4.lineheight};
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: ${constants.h4.fontsizeTablet};
    line-height: ${constants.h4.lineheightMobile};
  `};

  ${mediaqueries.phablet`
    font-size: ${constants.h4.fontsizeMobile};
    line-height: ${constants.h4.lineheightMobile};
  `};
`;

const h5 = styled.h5`
  font-size: ${constants.h5.fontsize};
  line-height: ${constants.h5.lineheight};
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: ${constants.h5.fontsizeTablet};
    line-height: ${constants.h5.lineheightMobile};
  `};

  ${mediaqueries.phablet`
    font-size: ${constants.h5.fontsizeMobile};
    line-height: ${constants.h5.lineheightMobile};
  `};
`;

const h6 = styled.h6`
  font-size: ${constants.h6.fontsize};
  line-height: ${constants.h6.lineheight};
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: ${constants.h6.fontsizeTablet};
    line-height: ${constants.h6.lineheightMobile};
  `};

  ${mediaqueries.phablet`
    font-size: ${constants.h6.fontsizeMobile};
    line-height: ${constants.h6.lineheightMobile};
  `};
`;

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};
