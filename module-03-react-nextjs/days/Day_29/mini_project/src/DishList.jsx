function DishList({ shownDishes, onAddToOrder, isLoading }) {
  if (isLoading) {
    const skeletons = Array.from({ length: 3 }, (_, i) => i);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {skeletons.map((id) => (
          <div 
            key={id} 
            style={{ 
              border: '1px solid #eee', 
              padding: '15px', 
              borderRadius: '8px', 
              backgroundColor: '#eaeaea',
              height: '120px',
              display: 'flex',
              gap: '15px',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ background: '#ddd', height: '20px', width: '60%', marginBottom: '10px', borderRadius: '4px' }}></div>
              <div style={{ background: '#ddd', height: '14px', width: '90%', marginBottom: '5px', borderRadius: '4px' }}></div>
              <div style={{ background: '#ddd', height: '14px', width: '40%', borderRadius: '4px' }}></div>
            </div>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd', borderRadius: '8px' }}></div>
            <style>{`
              @keyframes pulse {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
              }
            `}</style>
          </div>
        ))}
      </div>
    );
  }

  if (shownDishes.length === 0) {
    return <p style={{ color: '#888', fontStyle: 'italic' }}>No dishes in this category yet.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
      {shownDishes.map(d => (
        <div 
          key={d.id} 
          style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9', display: 'flex', gap: '15px', alignItems: 'center' }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{d.name}</h3>
              <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>{d.price} ETB</span>
            </div>
            <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{d.description}</p>
            <button 
              onClick={() => onAddToOrder(d.price)}
              style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add to Order
            </button>
          </div>
          {d.image && (
            <img 
              src={d.image} 
              alt={d.name} 
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default DishList;
