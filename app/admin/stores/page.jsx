'use client'
import PageTitle from "@/components/PageTitle"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Search } from "lucide-react"

export default function ActiveStoresPage() {

    const { user } = useUser()
    const { getToken } = useAuth()

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchStores = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/admin/stores', {headers: { Authorization: `Bearer ${token}` }})
            setStores(data.stores)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
        setLoading(false)
    }

    const toggleIsActive = async (storeId) => {
        try {
            const token = await getToken()
            const { data } = await axios.post('/api/admin/toggle-store', {storeId}, {headers: { Authorization: `Bearer ${token}` }})
            await fetchStores()
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    useEffect(() => {
        if(user){
            fetchStores()
        }
    }, [user])

    return !loading ? (
        <div className="space-y-8">
            
            {/* Page Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Active Stores</h1>
                    <p className="text-slate-500 text-sm">Manage and monitor all currently active merchant stores.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search stores..." 
                        className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm w-full sm:w-64 transition-all"
                    />
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {stores.map((store) => (
                    <div key={store.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">

                        {/* Store Info Card */}
                        <StoreInfo store={store} />

                        {/* Action Footer */}
                        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex justify-between items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${store.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {store.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    onChange={() => toast.promise(toggleIsActive(store.id), { loading: "Updating..." })}
                                    checked={store.isActive}
                                />
                                <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                                <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Empty State */}
            {stores.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-medium">No active stores found.</p>
                </div>
            )}
        </div>
    ) : <Loading />
}