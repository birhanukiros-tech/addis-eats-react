"use server";

export async function validateOrder(orderData) {
  if (!orderData) {
    return {
      success: false,
      message: "Order information is required.",
    };
  }

  const { fullName, phone, address } = orderData;

  if (!fullName || !phone || !address) {
    return {
      success: false,
      message: "Full name, phone, and address are required.",
    };
  }

  return {
    success: true,
    message: "Order information is valid.",
  };
}