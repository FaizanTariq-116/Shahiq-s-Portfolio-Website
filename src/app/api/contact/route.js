import { connectDB } from "@/mongolib-db/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // 1️⃣ Connect DB
    await connectDB();

    // 2️⃣ Get data
    const data = await req.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 3️⃣ Save to MongoDB
    const savedMessage = await Contact.create(data);

    // 4️⃣ Create Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5️⃣ Send Email to Admin (You)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Portfolio Message",
      html: `
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
        <hr/>
        <small>Sent from your portfolio website</small>
      `,
    });

    // 6️⃣ Send Auto-Reply Email to User ✅
    await transporter.sendMail({
      from: `"Faizan Tariq" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Thanks for contacting me!",
      html: `
        <h3>Hi ${name}, 👋</h3>
        <p>Thanks for contacting me! I’ve received your message and will reply soon.</p>
        <br/>
        <p>Best Regards,<br/><b>Faizan Tariq</b></p>
        `,
    });

    // 7️⃣ Response
    return NextResponse.json({
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
};
