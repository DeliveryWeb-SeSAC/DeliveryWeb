
import CategoryButton from "./component/CategoryButton";
import InputBar from "./component/InputBar";

export default function SearchBar({ onSearch,onFilter}) {



    return (
        <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <CategoryButton 
                onSelectCategory={onFilter}
            />
            <InputBar 
                onRealTimeSearch={onSearch}
                onExplicitSearch={onSearch}
            />

        </div>
    );
}