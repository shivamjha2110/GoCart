'use client'
import { usePathname } from "next/navigation"
import { Home, ShieldCheck, Store, TicketPercent, LogOut, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useUser, useClerk } from "@clerk/nextjs"
import { motion } from "framer-motion"

const AdminSidebar = () => {

    const { user } = useUser()
    const { signOut } = useClerk()
    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Dashboard', href: '/admin', icon: Home },
        { name: 'Active Stores', href: '/admin/stores', icon: Store },
        { name: 'Approvals', href: '/admin/approve', icon: ShieldCheck },
        { name: 'Coupons', href: '/admin/coupons', icon: TicketPercent  },
    ]

    return user && (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 w-[280px] shrink-0 sticky top-0 h-screen z-20">
            
            {/* User Profile Card - Top */}
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Image className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 p-0.5" src={user.imageUrl} alt="" width={50} height={50} />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-slate-800">{user.fullName}</p>
                        <p className="text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full w-fit">SUPER ADMIN</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
                {sidebarLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={index} href={link.href} className="relative group">
                            {isActive && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-indigo-50 rounded-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                            <div className={`relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                                <div className="flex items-center gap-3">
                                    <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{link.name}</span>
                                </div>
                                {isActive && <ChevronRight size={16} />}
                            </div>
                        </Link>
                    )
                })}
            </div>
            
            {/* Logout - Bottom */}
            <div className="p-4 border-t border-slate-100">
                <button onClick={() => signOut()} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium text-sm group">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                        <LogOut size={18} />
                    </div>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar