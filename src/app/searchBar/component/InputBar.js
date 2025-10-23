import { useState } from "react";
import searchBarStyle from '@/app/searchBar/searchBar.module.css' 

export default function InputBar({ onRealTimeSearch, onExplicitSearch }) {

    const [keyword, setKeyword] = useState('');

    const handleValueChange = (e) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);

        if (newKeyword.trim() === '') {
            onRealTimeSearch('');
        }
    }

    const handleSearchClick = () => {
        onExplicitSearch(keyword.trim());
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick();
        }
    }

return (
    // 'search-form' 클래스 적용
    <div className={searchBarStyle['search-form']}>
        <input
            type='search'
            value={keyword}
            onChange={handleValueChange}
            placeholder="가게명 또는 음식메뉴를 입력하세요."
            onKeyDown={handleKeyDown}
            // 'search-input' 클래스 적용
            className={searchBarStyle['search-input']}
        />
        <button
            onClick={handleSearchClick}
            // 'search-button' 클래스 적용
            className={searchBarStyle['search-button']}
        >
            검색
        </button>
    </div>
);
}