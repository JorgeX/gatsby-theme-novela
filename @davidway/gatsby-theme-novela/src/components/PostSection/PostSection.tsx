import styled from "@emotion/styled";

const PostSection = styled.section<{ dark?: boolean }>`
  position: relative;
  left: -68px;
  padding-left: 68px;
  width: 100vw;
  margin: 25px auto 60px;

  ${({ dark }) => dark && `
    background: #1D2128;

    > * {
      color: white;
    }
  `}
`;

export default PostSection;
