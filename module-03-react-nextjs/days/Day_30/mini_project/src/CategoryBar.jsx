function CategoryBar({ selected, onSelect }) {
  const cats = ["All", "Main", "Vegan", "Grill"];

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      {cats.map(c => {
        const isActive = c === selected;
        
        return (
          <button 
            key={c} 
            onClick={() => onSelect(c)}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: '1px solid #ffcc00',
              cursor: 'pointer',
              backgroundColor: isActive ? '#ffcc00' : '#ffffff',
              color: isActive ? '#000000' : '#333333',
              fontWeight: isActive ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
export default CategoryBar;
