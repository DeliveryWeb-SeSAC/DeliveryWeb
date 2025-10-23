
import CategoryButton from "./component/CategoryButton";
import InputBar from "./component/InputBar";
import searchBarStyle from '@/app/searchBar/searchBar.module.css' 


export default function SearchBar({ onSearch,onFilter}) {



    return (
        // 클래스 적용
        <div className={searchBarStyle['search-bar-container']}>
            <InputBar 
                onRealTimeSearch={onSearch}
                onExplicitSearch={onSearch}
            />
            <CategoryButton 
                onSelectCategory={onFilter}
            />
        </div>
    );
}