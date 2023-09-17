import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import { MenuTitle } from "./MenuTitle";
import { css } from "@emotion/react";
import { ImageSquare } from "./ImageSqaure";
import { CategoryAddForm } from "../app/CategoryAddForm";
import { staticUrlOrigin } from "@root/src/shared/constants/url";
import { CategoryEditForm } from "../app/CategoryEditForm";

export type Category = {
  name: string;
  urls: string[];
};

const App = () => {
  const [categories, setCategories] = useState<Category[]>([]); // 사용자가 등록한 카테고리 리스트
  const [selectedCategory, setSelectedCategory] = useState<Category>(); // 선택한 카테고리
  const [newCategory, setNewCategory] = useState(""); // 새 카테고리 이름
  const [newCategoryUrls, setNewCategoryUrls] = useState(""); // 새 카테고리의 URL들
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);

  useEffect(() => {
    // 크롬 스토리지에서 데이터를 가져와서 categories 상태를 초기화합니다.
    chrome.storage.sync.get(["categories"], (result) => {
      if (result.categories) {
        setCategories(result?.categories);
        setSelectedCategory(result?.categories[0]);
      }
    });
  }, []);

  const handleClickSetSelectedCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleOpenTabs = () => {
    if (selectedCategory) {
      selectedCategory.urls.map((url) => {
        window.open(url);
      });
    }
  };

  const handleAddCategory = () => {
    // 중복된 카테고리 이름 체크
    if (categories.some((category) => category.name === newCategory)) {
      alert("이미 존재하는 카테고리 이름입니다.");
      return;
    }

    const newCategoryData = {
      name: newCategory,
      urls: newCategoryUrls.split(",").map((url) => url.trim()),
    };

    const updatedCategories = [...categories, newCategoryData];
    setCategories(updatedCategories);

    // 크롬 스토리지에 업데이트된 카테고리 정보 저장
    chrome.storage.sync.set({ categories: updatedCategories });
  };

  const handleDeleteCategory = (categoryName) => {
    const updatedCategories = categories.filter(
      (category) => category.name !== categoryName
    );
    setCategories(updatedCategories);

    // 크롬 스토리지에 업데이트된 카테고리 정보 저장
    chrome.storage.sync.set({ categories: updatedCategories }, () => {
      alert("카테고리가 삭제되었습니다.");
    });
  };

  const handleEditCategory = (categoryName: string) => {
    const selectedCategoryData = categories.find(
      (category) => category.name === categoryName
    );

    if (!selectedCategoryData) {
      alert("해당 카테고리를 찾을 수 없습니다.");
      return;
    }

    const newCategoryName = prompt(
      "새 카테고리 이름:",
      selectedCategoryData.name
    );
    if (newCategoryName === null) return;

    const newCategoryUrls = prompt(
      "카테고리 URL들 (쉼표로 구분):",
      selectedCategoryData.urls.join(", ")
    );
    if (newCategoryUrls === null) return;

    const updatedCategories = categories.map((category) =>
      category.name === categoryName
        ? {
          name: newCategoryName,
          urls: newCategoryUrls.split(",").map((url) => url.trim()),
        }
        : category
    );

    setCategories(updatedCategories);

    // 크롬 스토리지에 업데이트된 카테고리 정보 저장
    chrome.storage.sync.set({ categories: updatedCategories });
  };

  const [showCaregoryAddForm, setShowCaregoryAddForm] = useState(false);
  const [showCaregoryEditForm, setShowCaregoryEditForm] = useState(true);

  const handleClickToggleShowCaregoryAddForm = useCallback(() => {
    setShowCaregoryAddForm(!showCaregoryAddForm);
  }, [showCaregoryAddForm]);

  const handleClickToggleShowCaregoryEditForm = useCallback(() => {
    setShowCaregoryEditForm(!showCaregoryEditForm);
  }, [showCaregoryEditForm]);

  return (
    <Wrapper>
      <Body>
        <TitleWrapper>
          <MenuTitle>카테고리 추가</MenuTitle>
          <ImageSquare
            src={`${staticUrlOrigin}/olaf/assets/images/toggle_down.svg`}
            width="2.2rem"
            styles={css`
              cursor: pointer;
              transition: 0.2s;
              transform: rotate(${showCaregoryAddForm ? 0 : 180}deg);
            `}
            onClick={handleClickToggleShowCaregoryAddForm}
          />
        </TitleWrapper>
        {showCaregoryAddForm && (
          <CategoryAddForm
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            newCategoryUrls={newCategoryUrls}
            setNewCategoryUrls={setNewCategoryUrls}
            handleAddCategory={handleAddCategory}
          />
        )}
        <hr />
        <TitleWrapper>
          <MenuTitle>카테고리 목록</MenuTitle>
          <ImageSquare
            src={`${staticUrlOrigin}/olaf/assets/images/toggle_down.svg`}
            width="2.2rem"
            styles={css`
              cursor: pointer;
              transition: 0.2s;
              transform: rotate(${showCaregoryEditForm ? 0 : 180}deg);
            `}
            onClick={handleClickToggleShowCaregoryEditForm}
          />
        </TitleWrapper>
        {showCaregoryEditForm && (
          <CategoryEditForm
            categories={categories}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
            handleClickSetSelectedCategory={handleClickSetSelectedCategory}
            selectedCategory={selectedCategory}
          />
        )}
        <Button
          type="primary"
          disabled={!selectedCategory}
          onClick={handleOpenTabs}
          style={{ marginTop: "0.5rem" }}
        >
          탭 열기
        </Button>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #fff;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: cneter;
  position: fixed;
  top: 50px;
  right: 50px;
  z-index: 9999;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-align: center;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.2),
    0px 0px 2px 0px rgba(0, 0, 0, 0.5);
`;

export const MenuWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Body = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const Label = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default App;
