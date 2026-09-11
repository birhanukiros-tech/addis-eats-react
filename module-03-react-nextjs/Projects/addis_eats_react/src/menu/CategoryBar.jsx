function CategoryBar({ selectedCategory, onSelect}){
    const categories =[
        {value:"all", label:"All"},
        {value:"fast", label:"Fast"},
        {value:"non-fast", label:"Non -Fast"},
        {value: "drinks", label:"Drinks"}
    ];

    return(
        <div className="category-bar">
            {categories.map((category) =>(
                <button 
                key={category.value}
                onClick={() =>onSelect(category.value)}
                className={
                    selectedCategory ===category.value
                    ? "active": ""}>
                        {category.label}
                    </button>
            ))}
        </div>
    );
}

export default CategoryBar;