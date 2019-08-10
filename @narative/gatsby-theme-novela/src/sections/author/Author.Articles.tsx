import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import { IArticle } from "@types";

interface AuthorArticlesProps {
  articles: IArticle[];
}

const AuthorArticles = ({ articles }: AuthorArticlesProps) => {
  console.log(articles);
  return <Container>list</Container>;
};

export default AuthorArticles;

const Container = styled.div`
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(249, 250, 252, 0) 91.01%
  );
  border-radius: 8px;
  padding: 88px 98px;
`;

const placeholder = styled.div`
  ${mediaqueries.phablet`
  `}
`;
