'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Users, Globe, Trophy, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { assets } from '@/assets/assets' // Importing assets to use an image

const AboutPage = () => {

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className='min-h-screen bg-white overflow-hidden'>
      
      {/* 1. HERO SECTION WITH GRADIENT */}
      <div className="relative bg-slate-900 py-24 sm:py-32 isolate">
         {/* Background Blobs */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/30 rounded-full blur-[120px] -z-10"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] -z-10"></div>
         
         <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-indigo-300 text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    Since 2024
                </motion.div>
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                  We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">GoToCart.</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                  Redefining the digital shopping experience with cutting-edge technology. We bridge the gap between premium gadgets and your lifestyle.
                </motion.p>
            </motion.div>
         </div>
      </div>

      {/* 2. MAIN CONTENT WITH IMAGE */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                    Our Mission: <br />
                    <span className="text-indigo-600">Innovation for Everyone.</span>
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    At GoToCart, we believe that technology should enhance life, not complicate it. Started as a small project in 2024, we have grown into a global community of tech enthusiasts.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    We carefully curate every product in our catalog, ensuring that our customers receive only the best-in-class gadgets. From smart home devices to the latest wearables, we are your trusted partner in tech.
                </p>
                
                <div className="space-y-4">
                    {['24/7 Premium Support', 'Global Express Shipping', '1-Year Official Warranty'].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 group">
                            <div className="p-1 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={18} />
                            </div>
                            <span className="text-slate-700 font-medium">{item}</span>
                        </div>
                    ))}
                </div>

                <button className="mt-10 flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-indigo-500/20">
                    Join Our Journey <ArrowUpRight size={18} />
                </button>
            </motion.div>

            {/* Right: ADVANCED IMAGE LAYOUT */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative"
            >
                {/* Decorative Background Blob behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-[3rem] rotate-6 scale-95 -z-10 blur-sm opacity-60"></div>

                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                    {/* USING ASSETS IMAGE - Replace 'hero_model_img' with 'about_img' if you have one */}
                    <Image 
                        src={assets.hero_model_img} 
                        alt="About GoToCart" 
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        priority
                    />
                    
                    {/* Glass Overlay Text */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                        <p className="text-white font-bold text-xl">Driven by Passion</p>
                        <p className="text-slate-300 text-sm">Empowering creators & innovators.</p>
                    </div>
                </div>

                {/* Floating Glass Stat Card */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                            <Users size={20} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trusted By</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900">15K+</p>
                    <p className="text-xs text-slate-500 font-medium">Happy Customers</p>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
            </motion.div>
        </div>
      </div>

      {/* 3. STATS SECTION */}
      <div className="bg-slate-50 py-24 border-y border-slate-200">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                {[
                    { label: 'Total Products', value: '5,000+', icon: Trophy, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Countries Served', value: '120+', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Team Members', value: '50+', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                ].map((stat, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div className={`mx-auto w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={28} />
                        </div>
                        <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">{stat.label}</dt>
                        <dd className="order-first text-4xl font-bold tracking-tight text-slate-900">{stat.value}</dd>
                    </motion.div>
                ))}
            </div>
         </div>
      </div>
    </div>
  )
}

export default AboutPage