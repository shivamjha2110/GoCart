'use client'
import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminApprove() {

    const {user} = useUser()
    const {getToken} = useAuth()
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchStores = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/admin/approve-store', {
                 headers: { Authorization: `Bearer ${token}` }
            })
            setStores(data.stores)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
        setLoading(false)
    }

    const handleApprove = async ({ storeId, status }) => {
        try {
            const token = await getToken()
            const { data } = await axios.post('/api/admin/approve-store', {storeId, status}, {
                 headers: { Authorization: `Bearer ${token}` }
            })
            toast.success(data.message)
            await fetchStores()
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
        <div className="text-slate-500 mb-28">
            <h1 className="text-2xl">Approve <span className="text-slate-800 font-medium">Stores</span></h1>

            {stores.length ? (
                <div className="flex flex-col gap-8 mt-4">
                    {stores.map((store) => (
                        <div key={store.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">

                            {/* 1. The Store Info Card */}
                            <StoreInfo store={store} />

                            {/* 2. THE ACTION FOOTER (Proper Place for Buttons) */}
                            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex justify-end gap-4">
                                <button
                                    onClick={() => toast.promise(handleApprove({ storeId: store.id, status: 'rejected' }), { loading: 'rejecting' })}
                                    className="px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all"
                                >
                                    Reject Application
                                </button>
                                <button
                                    onClick={() => toast.promise(handleApprove({ storeId: store.id, status: 'approved' }), { loading: "approving" })}
                                    className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
                                >
                                    Approve Store
                                </button>
                            </div>
                        </div>
                    ))}

                </div>) : (
                <div className="flex items-center justify-center h-80">
                    <h1 className="text-3xl text-slate-400 font-medium">No Application Pending</h1>
                </div>
            )}
        </div>
    ) : <Loading />
}