import { connectDB } from "@/mongolib-db/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    // 1. Fetch the admin from DB
    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log("LOGIN FAIL: Username not found");
      return NextResponse.json({ success: false }, { status: 401 });
    }

    // 2. STRICTOR CHECK: ONLY use Bcrypt compare
    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", "authorized", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      return response;
    }

    console.log("LOGIN FAIL: Password does not match DB hash");
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}