'use client'
import Image from "next/image"
import { MapPin, Mail, Phone, Calendar, User, MoreHorizontal, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react"

const StoreCard = ({ store }) => {
    return (
        <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col h-full">
            
            {/* --- Header Section: Cover & Logo --- */}
            <div className="relative h-28 bg-gradient-to-r from-slate-900 to-slate-800">
                {/* Status Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-10">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        store.status === 'Active' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    } backdrop-blur-md`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'Active' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></span>
                        {store.status}
                    </div>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            {/* --- Store Identity (Overlapping Logo) --- */}
            <div className="px-6 relative flex justify-between items-end -mt-10 mb-4">
                <div className="relative p-1 bg-white rounded-2xl shadow-lg">
                    <Image 
                        width={80} 
                        height={80} 
                        src={store.logo} 
                        alt={store.name} 
                        className="w-20 h-20 rounded-xl object-contain bg-slate-50 border border-slate-100" 
                    />
                </div>
                {/* Quick Action Menu */}
                <button className="mb-1 text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-full transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* --- Main Content --- */}
            <div className="px-6 pb-6 flex-1 flex flex-col">
                
                {/* Store Name & Username */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {store.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">@{store.username}</p>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {store.description}
                </p>

                <div className="w-full h-px bg-slate-100 mb-6"></div>

                {/* Info Grid */}
                <div className="space-y-4 mb-6 flex-1">
                    
                    {/* Location */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                            <MapPin size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</p>
                            <p className="text-sm font-medium text-slate-700 leading-snug">{store.address}</p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-4">
                         <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
                                <Phone size={16} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                                <p className="text-sm font-medium text-slate-700 truncate">{store.contact}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                                <Mail size={16} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                                <p className="text-sm font-medium text-slate-700 truncate">{store.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Footer: Owner Info & Date --- */}
                <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-3">
                        <Image 
                            width={32} 
                            height={32} 
                            src={store.user.image} 
                            alt={store.user.name} 
                            className="w-8 h-8 rounded-full border border-white shadow-sm" 
                        />
                        <div>
                            <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                {store.user.name} <ShieldCheck size={12} className="text-indigo-500"/>
                            </p>
                            <p className="text-[10px] text-slate-500">Owner</p>
                        </div>
                    </div>
                    <div className="text-right">
                         <p className="text-[10px] text-slate-400 font-medium uppercase">Joined</p>
                         <p className="text-xs font-semibold text-slate-600">
                            {new Date(store.createdAt).toLocaleDateString()}
                         </p>
                    </div>
                </div>
                
                {/* View Button */}
                <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                    View Full Details <ArrowUpRight size={16} />
                </button>

            </div>
        </div>
    )
}

export default StoreCard