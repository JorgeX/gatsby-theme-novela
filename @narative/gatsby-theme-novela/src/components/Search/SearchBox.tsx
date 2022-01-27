import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import SearchIcon from "../../icons/ui/Search.Icon";
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <StyledForm className={className}>
        <Icon className='search-icon'/>
      <StyledInput
        className="SearchInput"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
        
      />
     
    </StyledForm>
  )
)
const StyledForm=styled.form`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 27px;
  border: 2px solid #130D0C;
  padding: 0 15px;
  &:hover {
    background: white;
    border-color: #858585;
  }
  ${mediaqueries.phablet`
  width: 95%;
  `}
`
const StyledInput=styled.input`
border: none;
flex-grow:1;
font-weight: 600;
font-size: 18px;
margin-left: 10px;
padding:7px 20px;
background: transparent;
color: #130D0C;
&::placeholder{
  color: #130D0C;
}
`

const Icon=styled(SearchIcon)`
margin-bottom:5px;
overflow:visible;
`
