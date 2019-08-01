import React from 'react'
from "@emotion/styled"

const Pill = ({ text }: { text: string }) => (
  <Frame>
    <Heading>{text}</Heading>
    <PillOutline aria-hidden="true" />
  </Frame>
)

export default Pill

const Frame = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 20px;
`

const Heading = styled.h1`
  position: absolute;
  top: 3px;
  color: #fff;
  width: 100%;
  text-align: center;
`

const PillOutline = () => (
  <svg
    width="103"
    height="27"
    viewBox="0 0 103 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 13L1 1L56 1"
      stroke="url(#paint0_linear)"
      strokeOpacity="0.8"
      strokeLinecap="round"
    />
    <path
      d="M102 20V26H51"
      stroke="url(#paint1_linear)"
      strokeOpacity="0.8"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="1.00001"
        y1="2.04348"
        x2="55.2949"
        y2="2.04348"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="102"
        y1="26"
        x2="73.4746"
        y2="26"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)
