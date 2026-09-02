function DishList({ shownDishes, onAddToOrder }) {
  // 1. Check for the Empty State first
  if (shownDishes.length === 0) {
    return <p style={{ color: '#888', fontStyle: 'italic' }}>No dishes in this category yet.</p>;
  }

  // 2. If there are dishes, render them on the screen
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
      {shownDishes.map(d => (
        <div 
          key={d.id} // Requirement: Must use stable 'id' keys for list items
          style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{d.name}</h3>
            <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>{d.price} ETB</span>
          </div>
          <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{d.description}</p>
          
          {/* When clicked, pass the dish price back to the parent component */}
          <button 
            onClick={() => onAddToOrder(d.price)}
            style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add to Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default DishList;
