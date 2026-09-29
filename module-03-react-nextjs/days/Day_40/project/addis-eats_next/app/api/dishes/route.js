import { NextResponse } from "next/server";
import { getDishes } from "../../../lib/dishes";

export async function GET() {
  try {
    const dishes = await getDishes();

    return NextResponse.json(dishes);
  } catch (error) {
    console.error("Failed to load menu API:", error);

    return NextResponse.json(
      {
        message: "Failed to load dishes",
      },
      {
        status: 500,
      }
    );
  }
}