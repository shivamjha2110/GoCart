'use client'
import { useUser, UserButton} from "@clerk/nextjs"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

const StoreNavbar = () => {

    const {user} = useUser()

    return (
        <div className="flex items-center justify-between px-6 sm:px-12 py-3 border-b border-slate-200 bg-white sticky top-0 z-20">
            {/* Branding */}
            <Link href="/store" className="flex items-center gap-2 group">
                <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-slate-900 transition-colors">
                    <ShoppingBag className="text-white w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        GoTo<span className="text-indigo-600">Cart</span>
                        <span className="text-indigo-600">.</span>
                    </h1>
                    {/* Store Badge */}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md shadow-orange-500/20">
                        Seller
                    </span>
                </div>
            </Link>

            <div className="flex items-center gap-4">
                <div className="text-right max-sm:hidden">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Logged in as</p>
                    <p className="text-sm font-semibold text-slate-700">{user?.fullName}</p>
                </div>
                <UserButton />
            </div>
        </div>
    )
}

export default StoreNavbar