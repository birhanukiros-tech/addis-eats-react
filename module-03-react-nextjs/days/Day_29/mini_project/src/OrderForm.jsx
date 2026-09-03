import { useState } from 'react';

function OrderForm({ total }) {
  // Requirement 1: Name, phone, and area stored in ONE single state object
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: ''
  });

  // This single handler manages updates for ALL three text fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,       // Requirement: Copy the object using spread (...) first!
      [name]: value      // Update ONLY the property that matches the input name attribute
    });
  };

  // Requirement 2: Live validation check for TeleBirr format
  // Accepts standard 10-digit 09/07 or international +2519/+2517 numbers
  const validatePhone = (phone) => {
    const regex = /^(\+2519|\+2517|09|07)\d{8}$/;
    return regex.test(phone);
  };

  const isPhoneValid = validatePhone(formData.phone);
  
  // Submit button is disabled if phone format is bad OR if text boxes are completely empty
  const isSubmitDisabled = !isPhoneValid || !formData.name || !formData.area;

  const handleSubmit = (e) => {
    e.preventDefault(); // Stops the webpage from reloading on form submit
    alert(`⚡ Order Placed!\nName: ${formData.name}\nTotal: ${total} ETB\nDelivery Area: ${formData.area}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '2px solid #000', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>📍 Checkout & TeleBirr Delivery</h3>
      
      {/* 1. Name Input Field */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
        <input 
          type="text" 
          name="name" // Matches the object key
          value={formData.name} // Controlled component parameter: value comes from state
          onChange={handleChange} // Feeds edits back into state
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          required 
        />
      </div>

      {/* 2. TeleBirr Phone Input Field */}
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
            // Colors the box border dynamically to help the student test
            borderColor: formData.phone === '' ? '#ccc' : (isPhoneValid ? 'green' : 'red')
          }}
          required 
        />
        {formData.phone && !isPhoneValid && (
          <span style={{ color: 'red', fontSize: '12px' }}>Invalid format. Use 09xxxxxxxx or +251xxxxxxxxx.</span>
        )}
      </div>

      {/* 3. Delivery Location Input Field */}
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

      {/* Requirement: Submit button is disabled unless live validation passes */}
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
