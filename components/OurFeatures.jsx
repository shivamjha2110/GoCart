'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Truck, ShieldCheck, Headphones, RefreshCw } from 'lucide-react'

const features = [
    {
        icon: Truck,
        title: "Free Shipping",
        desc: "On all orders over $50"
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        desc: "100% protected transactions"
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        desc: "Dedicated support team"
    },
    {
        icon: RefreshCw,
        title: "Easy Returns",
        desc: "7-day money back guarantee"
    }
]

const OurFeatures = () => {
  return (
    <section className='py-16 px-6'>
        <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {features.map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className='flex items-center gap-4 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-default'
                    >
                        <div className='p-3.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300'>
                            <item.icon size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <h4 className='font-bold text-slate-900 group-hover:text-indigo-700 transition-colors'>{item.title}</h4>
                            <p className='text-xs text-slate-500 font-medium mt-0.5'>{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default OurFeatures