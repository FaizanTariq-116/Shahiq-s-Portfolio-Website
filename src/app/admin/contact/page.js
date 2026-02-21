import { connectDB } from "@/mongolib-db/mongodb";
import Contact from "@/models/Contact";
import { deleteContact } from "@/mongolib-db/action";

export default async function AdminContactPage() {
  await connectDB();
  const messages = await Contact.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Inbox Messages</h2>
      <div className="space-y-4">
        {messages.length === 0 && <p>No messages received yet.</p>}
        {messages.map((msg) => (
          <div key={msg._id} className="bg-white p-6 rounded-2xl shadow-sm border relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{msg.name}</h3>
                <p className="text-sm text-gray-500">{msg.email}</p>
                <p className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
              <form action={deleteContact.bind(null, msg._id.toString())}>
                <button className="bg-gray-100 p-2 rounded-lg hover:bg-red-100 hover:text-red-500 transition">Delete</button>
              </form>
            </div>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">"{msg.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}