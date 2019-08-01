import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useColorMode } from "theme-ui";

import mediaqueries from "@styles/media";

import { IRichText } from "@typings";

function RichText({ content, children, ...props }: React.SFC<IRichText>) {
  const [colorMode] = useColorMode();

  return (
    <Content isDark={colorMode === "dark"} {...props}>
      <MDXRenderer>{content}</MDXRenderer>
      {children}
    </Content>
  );
}

export default RichText;

const imageWidths = {
  regular: "680px",
  large: "1004px",
  full: "100vw",
};

const articleWidth = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;

const selectionColor = css`
  &::selection {
    background: #c9e1f4; /* WebKit/Blink Browsers */
  }

  &::-moz-selection {
    background: #c9e1f4; /* Gecko Browsers */
  }
`;

const transitionColor = css`
  transition: color 0.25s ease;
`;

const Content = styled.div<{ isDark: boolean }>`
  position: relative;
  ${selectionColor};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${articleWidth};
    font-family: ${p => p.theme.fonts.serif};
    color: ${p => p.theme.colors.primary};
    font-weight: 800;
  }

  h1,
  h1 *,
  h2,
  h2 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 2rem;
    padding-top: 20px;

    ${mediaqueries.desktop_up`
      font-size: 3.2rem;
      paddng-top: 65px;
      margin-bottom: 2.5rem;
    `};
  }

  h3,
  h3 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 1rem;

    ${mediaqueries.desktop`
      margin-top: 0;
      margin-bottom: 0.75rem;
    `};
  }

  a,
  a * {
    color: ${p => p.theme.colors.accent};
    ${transitionColor};

    &:visited {
      color: ${p => p.theme.colors.accent};
      opacity: 0.85;
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  figure {
    margin-bottom: 0;

    img {
      margin-bottom: 15px;
    }

    figcaption {
      ${articleWidth};
      font-family: ${p => p.theme.fonts.sansSerif};
      color: #000;
      opacity: 0.5;
      font-size: 16px;
      display: block;
      margin-bottom: 75px;

      ${mediaqueries.tablet`
        margin-bottom: 30px;
        font-size: 18px;
      `};
    }
  }

  blockquote {
    ${transitionColor};
    margin: 50px auto;
    color: ${p => p.theme.colors.articleText};
    font-family: ${p => p.theme.fonts.serif};
    font-style: italic;

    ${mediaqueries.tablet`
      margin: 15px auto 45px;
    `};

    p {
      max-width: 880px;
      padding-right: 100px;
      width: 100%;
      margin: 50px auto;
      font-size: 36px;
      line-height: 1.32;
      font-weight: bold;

      ${mediaqueries.tablet`
        font-size: 26px;
        padding: 0 180px;
      `};

      ${mediaqueries.phablet`
        font-size: 36px;
        padding: 0 20px 0 40px;
      `};
    }
  }

  .prism-code {
    width: 100%;
    max-width: 744px;
    margin: 0 auto;
    padding: 32px;
    font-size: 14px;
    margin: 50px auto;
    border-radius: 5px;

    .operator + .maybe-class-name {
      color: #ffcf74 !important;
    }

    .plain ~ .operator {
      color: #5fa8aa !important;
    }

    ${mediaqueries.tablet`
      max-width: 526px;
      padding: 20px 20px;
    `};

    ${mediaqueries.phablet`
      border-radius: 0;
      padding: 35px 20px;
    `};
  }

  ul,
  ol {
    ${articleWidth} list-style: none;
    counter-reset: list;
    color: ${p => p.theme.colors.articleText};
    ${transitionColor};
    position: relative;
    padding-left: 30px;
    margin-bottom: 30px;

    ${mediaqueries.tablet`
      padding-left: 0px;
    `};

    ${mediaqueries.phablet`
      padding-left: 20px;
    `};

    li {
      position: relative;
      margin-bottom: 15px;

      ${mediaqueries.tablet`
        padding-left: 30px;
      `};

      ${mediaqueries.phablet`
        padding-left: 30px;
      `};

      p {
        ${mediaqueries.tablet`
          padding: 0;
        `};
      }
    }

    li > * {
      display: inline;
    }

    li::before {
      width: 3rem;
      display: inline-block;
      position: absolute;
      color: ${p => p.theme.colors.secondary};
    }
  }

  ul li::before {
    content: "";
    position: absolute;
    left: -30px;
    top: 8px;
    height: 8px;
    width: 8px;
    background: ${p => p.theme.colors.secondary};

    ${mediaqueries.tablet`
      left: 0;
    `};
  }

  ol li::before {
    counter-increment: list;
    content: counter(list) ".";
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: -0.3rem;
    font-size: 2rem;

    ${mediaqueries.tablet`
      left: 0;
    `};
  }

  p {
    ${articleWidth};
    margin-bottom: 35px;
    line-height: 1.756;
    font-size: 18px;
    color: ${p => p.theme.colors.articleText};

    b {
      font-weight: 800;
    }
  }

  .gatsby-resp-image-background-image {
    display: none !important;
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 45px auto 85px;
    border-radius: 5px;

    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `};
  }

  .image__container {
    text-align: center;
  }

  img.image__with_shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  img.image__regular {
    width: 100%;
    max-width: ${imageWidths.regular};

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
    `};
  }

  img.image__large {
    width: 100%;
    max-width: ${imageWidths.large};

    ${mediaqueries.tablet`
      border-radius: 0;
    `};
  }

  img.image__full {
    width: 100%;
    max-width: ${imageWidths.full};
    border-radius: 0;
  }

  table {
    ${articleWidth};
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #dfe3e8;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    color: #000;
  }

  th {
    text-transform: uppercase;
    font-weight: 600;
  }

  tr {
    &:hover {
      background-color: #f4f6f8;
    }
  }

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #dfe3e8;
    vertical-align: top;
    white-space: nowrap;
  }

  hr {
    width: 250px;
    height: 1px;
    margin: 30px auto;
    opacity: 0.33;
  }

  hr {
    ${articleWidth};
    position: relative;
    width: 100%;
    margin: 25px auto 60px;
    border: 0;
    height: 14.36px;
    background-image: url("${p =>
      p.isDark
        ? "data:image/svg+xml,%3Csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.432617' y='13.8564' width='16' height='1' transform='rotate(-60 0.432617 13.8564)' fill='%2350525B'/%3E%3C/svg%3E%0A"
        : "data:image/svg+xml,%3Csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.567383' y='14.1777' width='16' height='1' transform='rotate(-60 0.567383 14.1777)' fill='%232D2E33'/%3E%3C/svg%3E"}");
    background-repeat: repeat-x;
    box-sizing: border-box;

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
      margin: 0px auto 50px;
    `};
  }
`;
