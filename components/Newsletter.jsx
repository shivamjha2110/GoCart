'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim()) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true)
            setIsLoading(false)
            setEmail('')
        }, 1500)
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
    }

    return (
        <div className='bg-slate-900 text-white py-16 px-6'>
            <div className='max-w-4xl mx-auto text-center'>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Icon */}
                    <motion.div
                        variants={itemVariants}
                        className='inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-6'
                    >
                        <Mail size={32} />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        variants={itemVariants}
                        className='text-3xl sm:text-4xl font-bold mb-4'
                    >
                        Stay Updated with Latest Tech
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className='text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed'
                    >
                        Get exclusive deals, new product launches, and tech insights delivered straight to your inbox.
                        Join thousands of tech enthusiasts who trust us for the latest updates.
                    </motion.p>

                    {/* Form */}
                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSubmit}
                        className='max-w-md mx-auto'
                    >
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex-1 relative'>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className='w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm'
                                    required
                                    disabled={isLoading || isSubscribed}
                                />
                                <Mail className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400' size={20} />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || isSubscribed || !email.trim()}
                                className='px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 group min-w-[140px]'
                            >
                                {isLoading ? (
                                    <>
                                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                        <span>Subscribing...</span>
                                    </>
                                ) : isSubscribed ? (
                                    <>
                                        <CheckCircle size={20} />
                                        <span>Subscribed!</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className='group-hover:translate-x-1 transition-transform' size={20} />
                                        <span>Subscribe</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.form>

                    {/* Success Message */}
                    {isSubscribed && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='mt-6 p-4 bg-green-600/20 border border-green-500/30 rounded-full inline-flex items-center gap-3'
                        >
                            <CheckCircle className='text-green-400' size={24} />
                            <span className='text-green-300 font-medium'>
                                Thanks for subscribing! Check your email for confirmation.
                            </span>
                        </motion.div>
                    )}

                    {/* Trust Indicators */}
                    <motion.div
                        variants={itemVariants}
                        className='mt-8 pt-8 border-t border-white/10'
                    >
                        <p className='text-slate-400 text-sm'>
                            Join <span className='text-indigo-400 font-semibold'>50,000+</span> subscribers • No spam • Unsubscribe anytime
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Newsletter