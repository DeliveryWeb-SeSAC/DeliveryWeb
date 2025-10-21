import { useState } from "react";

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
        <div style={{ display: 'flex' }}>
            <input
                type='search'
                value={keyword}
                onChange={handleValueChange}
                placeholder="가게명 또는 음식메뉴를 입력하세요."
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearchClick}>검색</button>
        </div>
    );
}