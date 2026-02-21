import { connectDB } from "@/mongolib-db/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // 1. In Next.js 15, params is a Promise, so we MUST await it
    const { id } = await params; 

    await connectDB();

    // 2. We use findOne with your custom field { id: id }
    const project = await Project.findOne({ id: id });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}