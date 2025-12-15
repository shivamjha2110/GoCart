'use client'
import { useUser, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

const AdminNavbar = () => {

    const {user} = useUser()

    return (
        <div className="flex items-center justify-between px-6 sm:px-12 py-3 border-b border-slate-200 bg-white transition-all sticky top-0 z-10">
            {/* Updated Branding */}
            <Link href="/admin" className="flex items-center gap-2 group">
                <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-slate-900 transition-colors">
                    <ShoppingBag className="text-white w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        GoTo<span className="text-indigo-600">Cart</span>
                        <span className="text-indigo-600">.</span>
                    </h1>
                    {/* Admin Badge */}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/20">
                        Admin
                    </span>
                </div>
            </Link>

            <div className="flex items-center gap-3 font-medium text-slate-600 text-sm">
                <p className="max-sm:hidden">Hi, {user?.firstName}</p>
                <UserButton />
            </div>
        </div>
    )
}

export default AdminNavbar