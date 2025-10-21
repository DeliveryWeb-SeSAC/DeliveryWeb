export default function CategoryButton({ onSelectCategory }) {
    
    const categories = ['all', '치킨', '피자', '한식']; 

    return (
        <div>
            {categories.map(category => (
                <button 
                    key={category}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}