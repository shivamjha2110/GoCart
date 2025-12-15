'use client'
import { assets } from '@/assets/assets'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import { motion } from 'framer-motion'
import Link from 'next/link' // Import Link

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'

    return (
        <div className='relative w-full bg-white pt-10 lg:pt-20 overflow-hidden'>
            
            {/* Background Blob */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-[100px]" />
            </div>

            <div className='max-w-7xl mx-auto px-6 pb-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                    
                    {/* LEFT TEXT */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex flex-col justify-center z-10'
                    >
                        <div className='inline-flex items-center gap-2 self-start bg-white border border-indigo-100 shadow-sm px-4 py-2 rounded-full mb-6'>
                             <span className='flex h-2 w-2 relative'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-2 w-2 bg-indigo-500'></span>
                            </span>
                            <span className='text-xs font-bold text-slate-600 tracking-wide uppercase'>New Collection 2025</span>
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight'>
                            Experience the <br/>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x'>
                                Future Today.
                            </span>
                        </h1>

                        <p className='text-lg text-slate-500 mb-8 max-w-lg leading-relaxed'>
                            Discover gadgets that blend style with performance. 
                            From smart wearables to home automation, we have it all.
                        </p>
                        
                        {/* BUTTONS UPDATED WITH LINKS */}
                        <div className='flex flex-wrap gap-4'>
                            <Link 
                                href="/shop" 
                                className='bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 group'
                            >
                                Shop Now 
                                <ArrowRight className='group-hover:translate-x-1 transition-transform' size={18} />
                            </Link>
                            
                            {/* Scrolls to the #new-arrivals section */}
                            <Link 
                                href="#new-arrivals" 
                                className='bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:border-indigo-200 hover:bg-indigo-50 transition-all'
                            >
                                View Catalog
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='relative z-10 flex justify-center lg:justify-end'
                    >
                         <div className='absolute inset-0 bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-[3rem] rotate-3 -z-10 scale-90' />
                         <Image 
                            className='relative z-10 drop-shadow-2xl w-full max-w-[500px] h-auto object-contain' 
                            src={assets.hero_model_img} 
                            alt="Hero Product" 
                            priority
                        />
                    </motion.div>
                </div>
            </div>

            <div className='w-full border-t border-slate-100 bg-slate-50/50 py-6'>
                 <CategoriesMarquee />
            </div>
        </div>
    )
}

export default Hero