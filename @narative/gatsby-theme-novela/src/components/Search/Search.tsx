import algoliasearch from "algoliasearch/lite"
import {default as React, useMemo } from "react"
import styled from '@emotion/styled';
import { InstantSearch, PoweredBy } from "react-instantsearch-dom"
import SearchResult from "./SearchResult"
import SearchBox from "./SearchBox"
import Popup from "reactjs-popup";
import SearchIcon from "../../icons/ui/Search.Icon";

export default function Search({ indices }) {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  return (
    <Popup
      lockScroll
      contentStyle={{ border: "none" }}
      trigger={
        <SearchButtonContainer >
          <SearchButton >
            <Icon className='search-icon' /> Search
          </SearchButton>
        </SearchButtonContainer>
      }
      modal
    >
      {(close) => (
        <SearchPopupContent>
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            stalledSearchDelay={1000}
          >
            <SearchBox className="sticky" />
            <StyledSearchResult className="result" indices={indices} />
            <PoweredByContainer />
          </InstantSearch>
        </SearchPopupContent>
      )}
    </Popup>
  )
}
const SearchButtonContainer = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  border-radius: 27px;
  margin: 1rem 1rem 1rem 0px;
  padding:7px 15px;
  background: #f4f2f1;
  border: 2px solid #130D0C;
  flex-wrap: wrap;
  &:hover {
    background: #fd7d4a;
    color: #fafafa;
    border-color: #fd7d4a;
  }
`;
const SearchButton=styled.button`
font-weight: 600;
font-size: 18px;
display: flex;
align-items: center;
`
const Icon=styled(SearchIcon)`
margin-right: 5px;
`
const SearchPopupContent=styled.div`
display: flex;
position: relative;
flex-direction: column;
align-items: center;
background:  #f4f2f1;
border-radius: 5px;
overflow: hidden;
padding: 1rem;
height: 70vh;
width: 50vw;
`;
const  PoweredByContainer=styled(PoweredBy)`
position: absolute;
bottom: 1rem;
right: 1rem;
z-index: 999;
`
const StyledSearchResult=styled(SearchResult)`
background: #03a5fc;
overflow: auto;
padding: 2rem;
flex: 1;
`