import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import {
  LayoutGrid,
  ShoppingBag,
  BookOpen,
  Calendar,
  Bell,
  Settings,
  Search,
  FileText,
  CreditCard,
  Users as UsersIcon,
  Image as ImageIcon,
  Sun,
  Moon,
  MapPin,
  Menu,
  Globe,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Info,
  LogOut,
} from "lucide-react";

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname.includes(path);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      } else {
        // Check if user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (adminError || !adminData) {
          await supabase.auth.signOut();
          navigate('/admin/login');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-800"></div>
      </div>
    );
  }

  const menuGroups = [
    {
      title: "DASHBOARD",
      items: [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutGrid },
      ],
    },
    {
      title: "STREAMS MANAGEMENT",
      items: [{ name: "Streams", path: "/admin/streams", icon: BookOpen }],
    },
    {
      title: "PEOPLE MANAGEMENT",
      items: [
        { name: "Enrollments", path: "/admin/enrollments", icon: UsersIcon },
        { name: "Applications", path: "/admin/applications", icon: FileText },
        { name: "Alumni", path: "/admin/alumni", icon: UsersIcon },
        { name: "Faculty", path: "/admin/faculty", icon: UsersIcon },
      ],
    },
    {
      title: "EVENT MANAGEMENT",
      items: [{ name: "Events", path: "/admin/events", icon: Calendar }],
    },
    {
      title: "DONATION MANAGEMENT",
      items: [
        { name: "Donate", path: "/admin/donate", icon: Bell },
        { name: "Transactions", path: "/admin/transactions", icon: CreditCard },
      ],
    },
    {
      title: "CONTENT MANAGEMENT",
      items: [
        { name: "Blog", path: "/admin/blog", icon: FileText },
        { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
        { name: "States", path: "/admin/states", icon: MapPin },
        { name: "Reviews", path: "/admin/reviews", icon: MessageSquare },
        { name: "Notifications", path: "/admin/notifications", icon: Bell },
      ],
    },
  ];

  return (
    <div
      className={`flex h-screen font-sans transition-colors duration-300 ${isDarkMode ? "bg-slate-900" : "bg-[#f7f8fa]"}`}
    >
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-[#063970] text-white/70 transition-all duration-300 flex flex-col z-50 shadow-xl`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 bg-[#063970] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-[#063970] font-black text-xl">L</span>
            </div>
            {isSidebarOpen && (
              <span className="text-white font-bold text-xl tracking-tight">
                LohiaAdmin
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Search */}
        {isSidebarOpen && (
          <div className="px-4 py-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search menu"
                className="w-full bg-white dark:bg-slate-900/10 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:ring-1 focus:ring-white/20 outline-none"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto admin-scrollbar py-4 space-y-1">
          {menuGroups
            .flatMap((g) => g.items)
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 transition-all duration-200 group ${
                  isActive(item.path)
                    ? "bg-white dark:bg-slate-900/10 text-[#063970] dark:text-white border-l-4 border-white"
                    : "hover:bg-white/10 text-white/70 hover:text-white border-l-4 border-transparent"
                }`}
              >
                <item.icon
                  size={20}
                  className={`${isActive(item.path) ? "text-[#063970] dark:text-white" : "text-white/50 group-hover:text-white"}`}
                />
                {isSidebarOpen && (
                  <span className="ml-4 text-sm font-medium flex-1">
                    {item.name}
                  </span>
                )}
                {isSidebarOpen && isActive(item.path) && (
                  <ChevronRight size={14} className="text-white/50" />
                )}
              </Link>
            ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-40 transition-colors">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Search size={16} />
              <span className="text-sm">Search...</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-colors"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button className="p-2 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                58
              </span>
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                  Admin User
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-1">
                  Super Admin
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Profile"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-slate-100 dark:border-slate-800 group-hover:border-blue-500 transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f7f8fa] dark:bg-slate-950 admin-scrollbar transition-colors">
          <Outlet context={{ isDarkMode, isSidebarOpen }} />
        </main>
      </div>
    </div>
  );
};
