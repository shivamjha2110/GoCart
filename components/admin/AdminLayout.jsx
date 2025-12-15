'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon, Lock } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"
import { useUser, useAuth } from "@clerk/nextjs"
import axios from "axios"

const AdminLayout = ({ children }) => {

    const {user, isLoaded} = useUser()
    const { getToken } = useAuth()

    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchIsAdmin = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/admin/is-admin', {headers: { Authorization: `Bearer ${token}`}})
            setIsAdmin(data.isAdmin)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(isLoaded && user) fetchIsAdmin()
        else if (isLoaded && !user) setLoading(false)
    }, [user, isLoaded])

    if (loading) return <Loading />

    return isAdmin ? (
        <div className="flex flex-col h-screen bg-slate-50">
            <AdminNavbar />
            <div className="flex flex-1 items-start h-full overflow-hidden">
                <AdminSidebar />
                <div className="flex-1 h-full overflow-y-auto no-scrollbar p-6 lg:p-10">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-slate-50">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                    <Lock size={32} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Admin Access Required</h1>
                <p className="text-slate-500 mb-8">You do not have the necessary permissions to view this dashboard.</p>
                <Link href="/" className="bg-slate-900 text-white flex items-center justify-center gap-2 w-full py-3.5 rounded-xl hover:bg-slate-800 transition-all font-medium">
                    Return to Home <ArrowRightIcon size={18} />
                </Link>
            </div>
        </div>
    )
}

export default AdminLayout