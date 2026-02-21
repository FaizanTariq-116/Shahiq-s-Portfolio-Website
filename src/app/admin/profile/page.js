import { connectDB } from "@/mongolib-db/mongodb";
import About from "@/models/About";
import ProfileForm from "@/app/components/ProfileForm";

export default async function AdminAboutPage() {
  await connectDB();
  const about = await About.findOne().lean();

  return (
    <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Edit Portfolio Profile</h2>
      <ProfileForm initialData={JSON.parse(JSON.stringify(about))} />
    </div>
  );
}