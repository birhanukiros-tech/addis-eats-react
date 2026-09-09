function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required to receive the order.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required for delivery contact.";
  } else if (!/^\+?[0-9]{10,13}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number (e.g., 0911002233).";
  }

  if (!form.area) {
    errors.area = "Please select your primary delivery neighborhood area.";
  }

  if (!form.address.trim()) {
    errors.address = "Specific street, house number, or landmark address is required.";
  }

  return errors;
}

export default validate;
