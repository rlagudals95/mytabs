import React from "react";

import styled from "@emotion/styled";

interface IProps {
  children: React.ReactNode;
  isRequire?: boolean;
}

export const MenuTitle = ({ children, isRequire = true }: IProps) => {
  return (
    <Wrapper>
      {children}
      {isRequire && <RequireMark>*</RequireMark>}
    </Wrapper>
  );
};

const Wrapper = styled.h2`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.125rem; /* 141.667% */
  letter-spacing: -0.0375rem;
  text-align: start;
  width: 100%;
`;

const RequireMark = styled.sub`
  margin-left: 0.25rem;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.025rem;
`;
