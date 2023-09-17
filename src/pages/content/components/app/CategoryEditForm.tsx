import styled from "@emotion/styled";
import { COLOR } from "@root/src/shared/constants/color";

import { Button } from "antd";
import { Category } from "../Demo/app";

interface IProps {
  categories: Category[];
  selectedCategory: Category;
  handleEditCategory: (categoryName: string) => void;
  handleDeleteCategory: (categoryName: string) => void;
  handleClickSetSelectedCategory: (category: Category) => void;
}

export const CategoryEditForm = ({
  categories,
  handleEditCategory,
  handleDeleteCategory,
  handleClickSetSelectedCategory,
  selectedCategory,
}: IProps) => {
  return (
    <Wrapper>
      {categories.map((category) => {
        const isSelectedCategory =
          selectedCategory && category.name === selectedCategory.name;

        return (
          <CategoryList
            onClick={() => {
              console.log("isSelectedCategory :", isSelectedCategory);
              handleClickSetSelectedCategory(category);
            }}
            key={category.name}
            border={
              isSelectedCategory ? `1px solid ${COLOR.ACTIVE_MARIN}` : "none"
            }
          >
            <CategoryLeft>{category.name}</CategoryLeft>
            <CategoryRight>
              <Button
                size="small"
                onClick={() => handleEditCategory(category.name)}
              >
                수정
              </Button>
              <Button
                type="text"
                size="small"
                onClick={() => handleDeleteCategory(category.name)}
              >
                삭제
              </Button>
            </CategoryRight>
            <UrlContent>
              {category.urls.map((url) => (
                <UrlList key={url}>{url}</UrlList>
              ))}
            </UrlContent>
          </CategoryList>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CategoryList = styled.div<{ border: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 0.5rem;
  position: relative;
  padding: 0.5rem 0.3rem;
  outline: ${(props) => props.border};

  &:hover {
    background: ${COLOR.ALPHA_QUINARY_A};

    & > :last-of-type {
      display: flex;
    }
  }
`;

const UrlContent = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  text-align: left;
  display: none;
  trasnform: translateX(-50%);
  z-index: 999;
  padding: 0.5rem;
  gap: 0.3rem;
  border: 1px solid ${COLOR.STROKE};
  background: ${COLOR.WHITE};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 0.5rem 0px rgba(0, 0, 0, 0.06),
    0px 0px 0.5rem 0px rgba(0, 0, 0, 0.08);
`;

const UrlList = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${COLOR.STROKE};
`;

const CategoryLeft = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 500;
`;

const CategoryRight = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
