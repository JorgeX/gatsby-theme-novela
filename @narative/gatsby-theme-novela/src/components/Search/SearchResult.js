import Headings from '@components/Headings';
import styled from '@emotion/styled';
import { default as React } from 'react';
import {
  Highlight,
  Hits,
  Index,
  Snippet,
  connectStateResults,
} from 'react-instantsearch-dom';

export default function SearchResult ({ indices, className })  {
  return (
  <Results>
    <div className={className}>
      {indices.map(index => (
        <HitsInIndex index={index} key={index.name} />
      ))}
    </div>
  </Results>

)};
const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
);

const NoResult = ({ text }) => (
  <div className="no-results">
    <p>{text}</p>
  </div>
);
const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.query === '' ? (
      <NoResult text="Something in your mind? search it!" />
    ) : searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <NoResult text="No search results." />
    ),
);


const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <Headings.h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </Headings.h4>
      <Excerpt>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      </Excerpt>
    </Link>
  </div>
)
const StyledHits = styled(Hits)`
  ul {
    list-style: none;
    margin-left: 0;
  }
  li.ais-Hits-item {
    margin-bottom: 1em;
    color: var(--text-color);
    a {
      // color: #fff;
      color: var(--text-color);
      h5 {
        margin-bottom: 0.2em;
      }
    }
    padding-bottom: 15px;
    border-bottom: 1px solid var(--text-color);
  }
`;
const Excerpt = styled.p`
  font-size: 16px;
  color: #73737d;
`;
const PageHitContainer = styled.div``;
