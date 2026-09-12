function validateCheckout(formData) {
    const errors = {};

    if (!formData.fullname.trim()) {
        errors.fullname = "Full name is required.";
    }

    if (!formData.phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!/^(\+251|0)9\d{8}$/.test(formData.phone.trim())) {
        errors.phone = "Enter a valid Ethiopian phone number.";
    }

    if (!formData.address.trim()) {
        errors.address = "Delivery address is required.";
    }

    return errors;
}

export default validateCheckout;