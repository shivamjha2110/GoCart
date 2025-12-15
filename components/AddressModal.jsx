'use client'
import { addAddress } from "@/lib/features/address/addressSlice.js"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"

const AddressModal = ({ setShowAddressModal }) => {
    const { getToken } = useAuth()
    const dispatch = useDispatch()

    const [address, setAddress] = useState({
        name: '', email: '', street: '', city: '', state: '', zip: '', country: '', phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = await getToken()
            const { data } = await axios.post('/api/address', {address}, {headers: { Authorization: `Bearer ${token}` } })
            dispatch(addAddress(data.newAddress))
            toast.success(data.message)
            setShowAddressModal(false)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    // Modern Floating Label Input Component
    const ModernInput = ({ name, placeholder, type = "text" }) => (
        <div className="relative w-full">
            <input 
                name={name} 
                onChange={handleAddressChange} 
                value={address[name]} 
                type={type}
                className="peer w-full p-3 pt-5 font-light bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm placeholder-transparent"
                placeholder={placeholder}
                required 
            />
            <label className="absolute left-3 top-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-indigo-600">
                {placeholder}
            </label>
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                onClick={() => setShowAddressModal(false)}
            />
            
            <motion.form 
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Adding Address...' })} 
                className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Shipping Details</h2>
                        <p className="text-xs text-slate-500">Where should we deliver your order?</p>
                    </div>
                    <XIcon size={24} className="text-slate-400 hover:text-slate-600 cursor-pointer transition" onClick={() => setShowAddressModal(false)} />
                </div>

                <div className="space-y-4">
                    <ModernInput name="name" placeholder="Full Name" />
                    <ModernInput name="email" placeholder="Email Address" type="email" />
                    <ModernInput name="street" placeholder="Street Address" />
                    
                    <div className="flex gap-4">
                        <ModernInput name="city" placeholder="City" />
                        <ModernInput name="state" placeholder="State" />
                    </div>
                    
                    <div className="flex gap-4">
                        <ModernInput name="zip" placeholder="Zip Code" type="number" />
                        <ModernInput name="country" placeholder="Country" />
                    </div>
                    
                    <ModernInput name="phone" placeholder="Phone Number" />
                </div>

                <button className="w-full mt-8 bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20">
                    SAVE ADDRESS
                </button>
            </motion.form>
        </div>
    )
}

export default AddressModal