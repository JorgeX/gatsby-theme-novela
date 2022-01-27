import Headings from '@components/Headings';
import styled from '@emotion/styled';
import { Link } from "gatsby"
import { default as React } from 'react';
import {
  Highlight,
  Hits,
  Index,
  Snippet,
  connectStateResults,
} from 'react-instantsearch-dom';

export default function SearchResult ({ indices })  {
  return (
    <StyledResults>
  <Results>
    <div >
      {indices.map(index => (
        <HitsInIndex index={index} key={index.name} />
      ))}
    </div>
  </Results>
  </StyledResults>

)};
const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <StyledHits className="Hits" hitComponent={PageHit} />
  </Index>
);


const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.query === '' ? (
      <NoResult> Search for your favorite article!</NoResult>
    ) : searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <NoResult>No Search Result</NoResult>
    ),
);


const PageHit = ({ hit }) => (
  <PageHitContainer>
    <Link to={hit.slug}>
      <Headings.h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </Headings.h4>
      <Excerpt>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      </Excerpt>
    </Link>
  </PageHitContainer>
)
const StyledResults=styled.div`
flex: 1;
display: flex;
justify-content: center;
margin: 2.5rem;
`
const StyledHits = styled(Hits)`
  ul {
    list-style: none;
    margin-left: 0;
  }
`;
const Excerpt = styled.p`
  font-size: 16px;
   color: #73737d;
   margin-top: 0.5rem;
`;
const PageHitContainer = styled.div`
padding-bottom: 1rem ;
margin-top: 2.5rem;
border-bottom: 1px solid #73737d;
`;
const NoResult=styled.p`
font-weight: 600;
font-size: 18px;
flex: 1;
display: flex;
align-items:center;
text-align:center;
`