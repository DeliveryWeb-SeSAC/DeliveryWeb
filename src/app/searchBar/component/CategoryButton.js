export default function CategoryButton({ onSelectCategory }) {
    
    const categories = ['all', '치킨', '피자', '한식']; 

    return (
        <div style={{ marginTop: '10px' }}>
            {categories.map(category => (
                <button 
                    key={category}
                    onClick={() => onSelectCategory(category)} 
                    style={{ marginRight: '5px' }}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}