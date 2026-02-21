import Link from "next/link";
import { logout } from "@/mongolib-db/action"; // Import the logout action
import { LuCircleUserRound } from "react-icons/lu";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 sticky top-0 h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-red-500">Admin</h1>
        
        <nav className="flex flex-col gap-4 flex-1">
          <Link href="/admin/profile" className="hover:bg-slate-800 p-2 rounded transition">Profile</Link>
          <Link href="/admin/projects" className="hover:bg-slate-800 p-2 rounded transition">Projects</Link>
          <Link href="/admin/contact" className="hover:bg-slate-800 p-2 rounded transition">Contact Inbox</Link>
          
          <hr className="border-slate-700 my-4" />
          
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
            ← View Website
          </Link>

          {/* --- LOGOUT OPTION --- */}
          <form action={logout}>
            <button 
              type="submit" 
              className="w-full text-left text-lg font-bold text-red-500 hover:text-red-300 transition mt-55 flex items-center"
            >
              <LuCircleUserRound />
              Logout
            </button>
          </form>
        </nav>

        {/* Optional: Show version or user footer */}
        <div className="text-[10px] text-slate-500 mt-auto uppercase tracking-widest">
          Shahiq's Portfolio Admin Panel
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}