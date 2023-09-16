import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Input, Button, Select, Modal } from "antd";

const { Option } = Select;

const App = () => {
  const [categories, setCategories] = useState([]); // 사용자가 등록한 카테고리 리스트
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리
  const [newCategory, setNewCategory] = useState(""); // 새 카테고리 이름
  const [newCategoryUrls, setNewCategoryUrls] = useState(""); // 새 카테고리의 URL들

  useEffect(() => {
    // 크롬 스토리지에서 데이터를 가져와서 categories 상태를 초기화합니다.
    chrome.storage.sync.get(["categories"], (result) => {
      if (result.categories) {
        setCategories(result.categories);
      }
    });
  }, []);

  const handleOpenTabs = () => {
    const selectedCategoryData = categories.find(
      (category) => category.name === selectedCategory
    );

    if (selectedCategoryData) {
      selectedCategoryData.urls.forEach((url) => {
        chrome.tabs.create({ url });
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
    setSelectedCategory(newCategoryData.name); // 새 카테고리를 선택하도록 설정

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

  const handleEditCategory = (categoryName) => {
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

  return (
    <Wrapper>
      <h1>카테고리 탭 열기</h1>
      <div>
        <label htmlFor="categoryName">새 카테고리 이름:</label>
        <Input
          id="categoryName"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="categoryUrls">카테고리 URL들 (쉼표로 구분):</label>
        <Input.TextArea
          id="categoryUrls"
          value={newCategoryUrls}
          onChange={(e) => setNewCategoryUrls(e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handleAddCategory}>
        카테고리 추가
      </Button>
      <hr />
      <h2>카테고리 목록</h2>
      <Select
        defaultValue=""
        style={{ width: "100%" }}
        onChange={(value) => setSelectedCategory(value)}
      >
        <Option value="">카테고리 선택</Option>
        {categories.map((category) => (
          <div key={category.name}>
            <Option value={category.name}>{category.name}</Option>
            <Button onClick={() => handleEditCategory(category.name)}>
              수정
            </Button>
            <Button onClick={() => handleDeleteCategory(category.name)}>
              삭제
            </Button>
          </div>
        ))}
      </Select>
      <Button onClick={handleOpenTabs}>탭 열기</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #fff;
  width: 200px;
  position: fixed;
  top: 50px;
  right: 50px;
  z-index: 9999999;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-align: center;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.2),
    0px 0px 2px 0px rgba(0, 0, 0, 0.5);
`;

export default App;
