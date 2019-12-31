import React from 'react';
import styled from '@emotion/styled';
import { graphql, Link, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            categories
          }
        }
      }
    }
  }
`;

import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const Categories = ({ author }) => {
  const results = useStaticQuery(siteQuery);
  const categories = results.allSite.edges[0].node.siteMetadata.categories;
  console.log(categories);
  return (
    <CategoriesContainer>
      <LinksContainer>
        {categories.map((c, i) => (
          <CategoryLink key={i}> {c}</CategoryLink>
        ))}
      </LinksContainer>
      <AllLink> Show All </AllLink>
    </CategoriesContainer>
  );
};

export default Categories;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f4f2f1;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  ${mediaqueries.phablet`
     justify-content: center;
  `}
`;
const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  ${mediaqueries.phablet`
     justify-content: center;
     margin-bottom: 2rem;

  `}
`;

const CategoryLink = styled(Link)<{ back: string }>`
  background: #f4f2f1;
  border-radius: 27px;
  margin: 1rem 1rem 1rem 0px;
  padding: 11px 29px;
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
  color: #000000;

  &:hover {
    background: #fd7d4a;
    color: #fafafa;
  }
`;

const AllLink = styled(Link)<{ back: string }>`
  display: block;
  margin: 1rem;
  margin-right: 0px;
  padding: 11px 29px;
  padding-right: 0px;
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
  color: #000000;
  align-self: flex-end;
  justify-self: flex-end;
  ${mediaqueries.phablet`
     padding-right: 29px;
     margin-right: 1rem;
  `}
`;
