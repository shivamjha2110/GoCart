// File: src/app/(public)/contact/page.jsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully!");
    }

    const ModernInput = ({ label, type = "text", placeholder }) => (
        <div className="relative w-full">
            <input type={type} className="peer w-full p-4 pt-6 font-light bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder-transparent" placeholder={placeholder} required />
            <label className="absolute left-4 top-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-indigo-600">{label}</label>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <h1 className="text-4xl font-bold text-slate-900">Get in Touch</h1>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Mail size={20} /></div>
                            <div><p className="font-medium">Email Us</p><p className="text-slate-500 text-sm">shivam.jha0024@gmail.com</p></div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Phone size={20} /></div>
                            <div><p className="font-medium">Call Us</p><p className="text-slate-500 text-sm">+91 6398307694</p></div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><MapPin size={20} /></div>
                            <div><p className="font-medium">Visit Us</p><p className="text-slate-500 text-sm">13 Civil Lines, Bareilly, 243001</p></div>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <ModernInput label="Full Name" placeholder="John Doe" />
                        <ModernInput label="Email Address" type="email" placeholder="john@example.com" />
                        <div className="relative w-full">
                            <textarea className="peer w-full p-4 pt-6 font-light bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder-transparent min-h-[150px]" placeholder="Message" required></textarea>
                            <label className="absolute left-4 top-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-indigo-600">Your Message</label>
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white font-medium py-4 rounded-xl hover:bg-slate-800 transition-all flex justify-center gap-2">Send Message <Send size={18} /></button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
export default ContactPage