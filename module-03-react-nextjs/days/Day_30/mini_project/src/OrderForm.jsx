import { useState, useContext } from 'react';
import { CartContext } from "./CartProvider";

function OrderForm() {
  const { total, dispatch } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePhone = (phone) => {
    const regex = /^(\+2519|\+2517|09|07)\d{8}$/;
    return regex.test(phone);
  };

  const isPhoneValid = validatePhone(formData.phone);
  const isSubmitDisabled = !isPhoneValid || !formData.name || !formData.area || total === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`⚡ Order Submitted via TeleBirr!\nName: ${formData.name}\nTotal: ${total} ETB\nDelivery Area: ${formData.area}`);
    
    dispatch({ type: "clear" });
    setFormData({ name: '', phone: '', area: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '2px solid #000', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>📍 Checkout & TeleBirr Delivery</h3>
      
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          required 
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>TeleBirr Phone Number:</label>
        <input 
          type="text" 
          name="phone" 
          placeholder="0911223344 or +251911223344"
          value={formData.phone} 
          onChange={handleChange} 
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box',
            borderColor: formData.phone === '' ? '#ccc' : (isPhoneValid ? 'green' : 'red')
          }}
          required 
        />
        {formData.phone && !isPhoneValid && (
          <span style={{ color: 'red', fontSize: '12px' }}>Invalid format. Use 09xxxxxxxx or +251xxxxxxxxx.</span>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Subcity / Area:</label>
        <input 
          type="text" 
          name="area" 
          placeholder="e.g., Bole, Megenagna"
          value={formData.area} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          required 
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitDisabled}
        style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: isSubmitDisabled ? '#ccc' : '#4caf50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        Place Order ({total} ETB)
      </button>
    </form>
  );
}

export default OrderForm;
