"use server";

import { connectDB } from "./mongodb";
import Project from "@/models/Project";
import About from "@/models/About";
import Contact from "@/models/Contact";
import Admin from "@/models/Admin";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

/**
 * 1. SECURITY HELPER (The Gatekeeper)
 * Checks the browser for the "admin_token".
 * Every administrative action below calls this first.
 */
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  if (token !== "authorized") {
    throw new Error("Unauthorized access. Please login.");
  }
}

// --- AUTHENTICATION ACTIONS ---

/**
 * LOGOUT ACTION
 * Deletes the cookie and redirects to the home page.
 * This effectively blocks "switching" back to admin.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  
  // Clear cache for the whole site
  revalidatePath("/");
  redirect("/"); 
}

/**
 * CHANGE CREDENTIALS ACTION
 * Hashes the new password and updates the Database.
 */
export async function updateAdminCredentials(formData) {
  await verifyAdmin(); 
  await connectDB();

  const newUsername = formData.get("username");
  const newPassword = formData.get("password");

  if (!newUsername || !newPassword) throw new Error("Fields cannot be empty");

  // Hash the new password before saving to DB
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await Admin.findOneAndUpdate({}, { 
    username: newUsername, 
    password: hashedNewPassword 
  });

  // Force logout so user must log in with new credentials
  await logout(); 
}

// --- PROJECT ACTIONS ---

export async function addProject(formData) {
  await verifyAdmin(); 
  await connectDB();
  
  const data = Object.fromEntries(formData);
  
  await Project.create({
    id: data.id,
    title: data.title,
    image: data.image,
    description: data.description,
  });
  
  revalidatePath("/"); 
  revalidatePath("/admin/projects");
}

export async function deleteProject(mongoId) {
  await verifyAdmin(); 
  await connectDB();
  
  await Project.findByIdAndDelete(mongoId);
  
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// --- ABOUT/PROFILE ACTIONS ---

export async function updateAbout(formData) {
  await verifyAdmin(); 
  await connectDB();
  
  const name = formData.get("name");
  const introText = formData.get("introText");
  const description = formData.get("description");
  const image = formData.get("image");
  
  // Handles multiple skill inputs (Add/Delete functionality)
  const skillsArray = formData.getAll("skills")
    .map(s => s.trim())
    .filter(s => s !== "");

  await About.findOneAndUpdate(
    {}, 
    {
      name,
      introText,
      description,
      image,
      skills: skillsArray
    },
    { upsert: true, new: true } 
  );
  
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// --- CONTACT ACTIONS ---

export async function deleteContact(mongoId) {
  await verifyAdmin(); 
  await connectDB();
  
  await Contact.findByIdAndDelete(mongoId);
  
  revalidatePath("/admin/contact");
}