"use server";

import { connectDB } from "./mongodb";
import Project from "@/models/Project";
import About from "@/models/About";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * SECURITY GUARD
 * This function is used by all other actions. It checks for the "VIP Pass" (cookie).
 * If the cookie is missing, it prevents any changes to your database.
 */
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  if (token !== "authorized") {
    throw new Error("Unauthorized access. Please login.");
  }
}

// --- AUTH ACTIONS ---

/**
 * LOGOUT ACTION (The "Switching" Blocker)
 * 1. It deletes the security cookie immediately.
 * 2. It redirects you to the public website.
 * 3. Once this runs, the Middleware will block any attempt to switch back to admin.
 */
export async function logout() {
  const cookieStore = await cookies();
  
  // Delete the token to block switching
  cookieStore.delete("admin_token");
  
  // Clear the cache so the website knows you are logged out
  revalidatePath("/");
  
  // Redirect to website
  redirect("/"); 
}

// --- PROJECT ACTIONS ---

export async function addProject(formData) {
  await verifyAdmin(); // Check if logged in
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
  await verifyAdmin(); // Check if logged in
  await connectDB();
  
  await Project.findByIdAndDelete(mongoId);
  
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// --- ABOUT/PROFILE ACTIONS ---

export async function updateAbout(formData) {
  await verifyAdmin(); // Check if logged in
  await connectDB();
  
  const name = formData.get("name");
  const introText = formData.get("introText");
  const description = formData.get("description");
  const image = formData.get("image");
  
  const skillsArray = formData.get("skills") 
    ? formData.get("skills").split(",").map(s => s.trim()).filter(s => s !== "")
    : [];

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
  await verifyAdmin(); // Check if logged in
  await connectDB();
  
  await Contact.findByIdAndDelete(mongoId);
  
  revalidatePath("/admin/contact");
}