export async function POST(request) {
  const body = await request.json();

  const fieldErrors = {};

  if (!body.name || body.name.trim() === "") {
    fieldErrors.name = "Name is required";
  }

  if (!body.phone || body.phone.trim() === "") {
    fieldErrors.phone = "Phone is required";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors,
      },
      { status: 422 }
    );
  }

  return Response.json(
    {
      message: "Order received",
      order: body,
    },
    { status: 201 }
  );
}