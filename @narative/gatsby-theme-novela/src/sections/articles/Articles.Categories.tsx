import React from 'react';
import styled from '@emotion/styled';
import { graphql, Link, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            basePath
            categories {
              label
              slug
            }
          }
        }
      }
    }
  }
`;

import mediaqueries from '@styles/media';

const Categories = () => {
  const results = useStaticQuery(siteQuery);
  const categories = results.allSite.edges[0].node.siteMetadata.categories;
  const basePath = results.allSite.edges[0].node.siteMetadata.basePath;

  console.log(categories);
  return (
    <CategoriesContainer>
      <LinksContainer>
        {categories.map(({ label, slug }, i) => {
          const path = basePath === '/' ? `/${slug}` : `${basePath}/${slug}`;
          return (
            <CategoryLink
              activeClassName="active"
              partiallyActive={true}
              key={i}
              to={path}
            >
              {label}
            </CategoryLink>
          );
        })}
      </LinksContainer>
      <AllLink to={basePath}> Show All </AllLink>
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
  &.active {
    background: #fd7d4a;
    color: #fafafa;
  }

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
