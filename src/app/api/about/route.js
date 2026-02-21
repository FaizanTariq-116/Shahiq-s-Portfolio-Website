import { connectDB } from "@/mongolib-db/mongodb";
import About from "@/models/About";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const about = await About.findOne().lean();

    if (!about) {
      return NextResponse.json(
        { message: "About data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json(
      { message: "Database error", error: error.message },
      { status: 500 }
    );
  }
}
