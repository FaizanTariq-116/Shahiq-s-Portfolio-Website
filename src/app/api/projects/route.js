import { connectDB } from "@/mongolib-db/mongodb"
import Project from "@/models/Project"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find();

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
