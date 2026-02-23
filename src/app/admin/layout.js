"use client"; // 1. Must be a client component to use usePathname

import Link from "next/link";
import { usePathname } from "next/navigation"; // 2. Import this hook
import { logout } from "@/mongolib-db/action"; 
import { 
  LuUser, 
  LuSettings, 
  LuBriefcase, 
  LuMail, 
  LuExternalLink, 
  LuLogOut 
} from "react-icons/lu";

export default function AdminLayout({ children }) {
  const pathname = usePathname(); // 3. Get the current URL path

  // 4. LOGIC: If we are on the login page, don't show the sidebar layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - This will now be hidden on /admin/login */}
      <aside className="w-64 bg-slate-900 text-white p-6 sticky top-0 h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-red-500 tracking-tighter uppercase">Admin Panel</h1>
        
        <nav className="flex flex-col gap-2 flex-1">
          {/* Main Navigation */}
          <Link href="/admin/profile" className={`flex items-center gap-3 p-3 rounded-xl transition text-sm ${pathname === '/admin/profile' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
            <LuUser className="text-xl text-red-500" />
            Profile
          </Link>
          
          <Link href="/admin/projects" className={`flex items-center gap-3 p-3 rounded-xl transition text-sm ${pathname === '/admin/projects' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
            <LuBriefcase className="text-xl text-red-500" />
            Projects
          </Link>
          
          <Link href="/admin/contact" className={`flex items-center gap-3 p-3 rounded-xl transition text-sm ${pathname === '/admin/contact' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
            <LuMail className="text-xl text-red-500" />
            Contact Inbox
          </Link>

          <hr className="border-slate-800 my-4" />

          {/* Settings & External */}
          <Link href="/admin/settings" className={`flex items-center gap-3 p-3 rounded-xl transition text-sm ${pathname === '/admin/settings' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
            <LuSettings className="text-xl text-gray-400" />
            Security Settings
          </Link>

          <Link href="/" className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition text-sm text-gray-400 hover:text-white">
            <LuExternalLink className="text-xl" />
            View Website
          </Link>

          {/* --- LOGOUT OPTION --- */}
          <div className="mt-auto pt-4">
            <form action={logout}>
              <button 
                type="submit" 
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition font-bold"
              >
                <LuLogOut size={20} />
                Logout
              </button>
            </form>
          </div>
        </nav>

        <div className="text-[10px] text-slate-500 mt-6 uppercase tracking-widest border-t border-slate-800 pt-4">
          Shahiq&apos;s Portfolio
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}