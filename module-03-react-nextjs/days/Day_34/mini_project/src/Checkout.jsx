import React, { useState, useRef } from "react";
import useCartStore from "./cartStore";
import validate from "./validate";
import Field from "./Field";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({ name: "", phone: "", area: "Bole", address: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);
  const addressRef = useRef(null);

  const refs = {
    name: nameRef,
    phone: phoneRef,
    area: areaRef,
    address: addressRef,
  };

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const show = (field) => {
    return touched[field] && errors[field];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasErrors) {
      const allTouched = {};
      Object.keys(form).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      const firstErrorField = Object.keys(errors)[0];
      if (refs[firstErrorField] && refs[firstErrorField].current) {
        refs[firstErrorField].current.focus();
      }
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      if (Math.random() > 0.5) {
        clearCart();
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setTimeout(() => {
          const firstInvalidField = Object.keys(errors)[0] || "name";
          if (refs[firstInvalidField] && refs[firstInvalidField].current) {
            refs[firstInvalidField].current.focus();
          }
        }, 50);
      }
      setSubmitting(false);
    }, 1500);
  };

  if (submitStatus === "success") {
    return (
      <div className="page-wrapper success-alert">
        <h2>🎉 Order Received Successfully!</h2>
        <p>Thank you for ordering with Addis Eats. We are preparing your fresh platter right now.</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="checkout-box">
        <h2>Complete Your Delivery Details</h2>
        <p className="sub-text" style={{ fontSize: "14px", marginBottom: "20px" }}>
          Review your items and authorize your food dispatch below.
        </p>

        {submitStatus === "error" && (
          <div className="network-error-alert" role="alert">
            ⚠️ Network transmission failure. Please verify coordinates and try submitting again.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Field
            label="Full Delivery Name"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            inputRef={nameRef}
          />

          <Field
            label="Phone Contact Number"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            inputRef={phoneRef}
          />

          <Field
            label="Select Neighborhood Area"
            id="area"
            name="area"
            type="select"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.area}
            touched={touched.area}
            options={["Bole", "Kazanchis", "Old Airport", "Megenagna", "Sarbet"]}
            inputRef={areaRef}
          />

          <Field
            label="Specific Street or Landmark Address"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.address}
            touched={touched.address}
            inputRef={addressRef}
          />

          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? `Processing Transmission...` : `Place Order — ${total} ETB`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
