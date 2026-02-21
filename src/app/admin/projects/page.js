import { connectDB } from "@/mongolib-db/mongodb";
import Project from "@/models/Project";
import { deleteProject } from "@/mongolib-db/action";
import ProjectForm from "@/app/components/ProjectForm";

export default async function AdminProjectsPage() {
  await connectDB();
  const projects = await Project.find().lean();

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
      <ProjectForm />

      <div className="grid gap-4">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-white p-4 rounded-xl flex items-center justify-between border shadow-sm">
            <div className="flex items-center gap-4">
              <img src={proj.image} alt="" className="w-16 h-10 object-cover rounded" />
              <h4 className="font-bold">{proj.title}</h4>
            </div>
            <form action={deleteProject.bind(null, proj._id.toString())}>
              <button className="text-red-500 font-medium hover:underline">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}