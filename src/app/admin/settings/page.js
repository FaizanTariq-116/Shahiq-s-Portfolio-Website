import { connectDB } from "@/mongolib-db/mongodb";
import Admin from "@/models/Admin";
import { updateAdminCredentials } from "@/mongolib-db/action"

export default async function AdminSettingsPage() {
  await connectDB();
  const admin = await Admin.findOne().lean();

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
      <h2 className="text-3xl font-bold mb-2">Security Settings</h2>
      <p className="text-gray-500 mb-8 text-sm">Change your login credentials here.</p>
      <form action={updateAdminCredentials} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 ml-1">New Username</label>
          <input 
            name="username" 
            defaultValue={admin?.username} 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2 ml-1">New Password</label>
          <input 
            name="password" 
            type="password" 
            placeholder="Enter new secure password" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" 
            required 
          />
        </div>

        <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-xs text-red-600 font-medium italic">
                Note: Updating these will end your current session. You will be redirected to the home page and must log in again with your new credentials.
            </p>
        </div>

        <button className="w-full bg-black text-white p-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg active:scale-95">
          Save New Credentials
        </button>
      </form>
    </div>
  );
}