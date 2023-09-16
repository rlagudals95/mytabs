import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

import { COLOR } from "@src/shared/constants/color";
import { Button, Input } from "antd";
import { InputWrapper, Label, MenuWrapper } from "../Demo/app";

interface IProps {
  newCategory: string;
  setNewCategory: React.Dispatch<React.SetStateAction<string>>;
  newCategoryUrls: string; //@TODO - 복수형이므로 string[]
  setNewCategoryUrls: () => void;
  handleAddCategory: () => void;
}

export const CategoryAddForm = ({
  newCategory,
  setNewCategory,
  newCategoryUrls,
  setNewCategoryUrls,
  handleAddCategory,
}: IProps) => {
  return (
    <Wrapper>
      <MenuWrapper>
        <InputWrapper>
          <Label>카테고리이름</Label>
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </InputWrapper>
      </MenuWrapper>
      <MenuWrapper>
        <InputWrapper>
          <Label>카테고리 URL들 (쉼표로 구분):</Label>
          <Input.TextArea
            id="categoryUrls"
            value={newCategoryUrls}
            onChange={(e) => setNewCategoryUrls(e.target.value)}
          />
        </InputWrapper>
      </MenuWrapper>
      <Button type="primary" onClick={handleAddCategory}>
        카테고리 추가
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
