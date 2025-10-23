import { useState } from 'react'; //  상태 관리 import
import categoryButtonStyle from '@/app/searchBar/searchBar.module.css'; //  CSS Module import

export default function CategoryButton({ onSelectCategory }) {
    
    const categories = ['all', '치킨', '피자', '한식','카페/디저트'];
    // 🌟 'all'을 기본 선택 값으로 설정
    const [selectedCategory, setSelectedCategory] = useState('all'); 
    
    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // 상태 업데이트
        onSelectCategory(category);    // 부모 컴포넌트로 선택 값 전달
    }

    return (
        //  컨테이너 클래스 적용
        <div className={categoryButtonStyle['category-buttons-wrapper']}>
            {categories.map(category => (
                <button 
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    //  선택된 카테고리에만 'active' 클래스 동적 적용
                    className={`${categoryButtonStyle['category-btn']} ${
                        selectedCategory === category ? categoryButtonStyle['active'] : ''
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}