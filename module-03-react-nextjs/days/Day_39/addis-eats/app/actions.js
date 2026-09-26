"use server";

import { revalidatePath } from "next/cache";

export async function placeOrder(previousState, formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");

  const fieldErrors = {};

  if (!name || name.trim() === "") {
    fieldErrors.name = "Name is required";
  }

  if (!phone || phone.trim() === "") {
    fieldErrors.phone = "Phone is required";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      error: "Validation failed",
      fieldErrors,
    };
  }

  console.log("Order:", {
    name,
    phone,
  });

  revalidatePath("/orders");

  return {
    success: true,
    message: "Order placed successfully",
  };
}
