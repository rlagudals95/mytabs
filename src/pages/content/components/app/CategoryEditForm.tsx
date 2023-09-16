import styled from "@emotion/styled";

import { Button } from "antd";
import { Category } from "../Demo/app";

interface IProps {
  categories: Category[];
  handleEditCategory: (categoryName: string) => void;
  handleDeleteCategory: (categoryName: string) => void;
}

export const CategoryEditForm = ({
  categories,
  handleEditCategory,
  handleDeleteCategory,
}: IProps) => {
  return (
    <Wrapper>
      {categories.map((category) => (
        <div key={category.name}>
          <option value={category.name}>{category.name}</option>
          <Button onClick={() => handleEditCategory(category.name)}>
            수정
          </Button>
          <Button onClick={() => handleDeleteCategory(category.name)}>
            삭제
          </Button>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
