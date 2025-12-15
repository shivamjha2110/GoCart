'use client'
import React from 'react'
import toast from 'react-hot-toast';

export default function Banner() {

    const [isOpen, setIsOpen] = React.useState(true);

    const handleClaim = () => {
        setIsOpen(false);
        toast.success('Coupon copied to clipboard!');
        navigator.clipboard.writeText('NEW20');
    };

    if (!isOpen) return null;

    return (
        // Removed 'fixed' positioning logic. Now it fills its container.
        <div className="w-full relative px-6 py-3 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 overflow-hidden group">
            
            {/* Decorative Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000"></div>

            <div className='flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4 relative z-10'>
                <div className="flex items-center gap-3">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold border border-white/30">LIMITED OFFER</span>
                    <p className="text-sm sm:text-base">Get <span className="font-bold text-yellow-300">20% OFF</span> on Your First Order!</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <button onClick={handleClaim} type="button" className="bg-white text-indigo-600 hover:bg-slate-50 font-bold text-xs sm:text-sm px-6 py-2 rounded-full transition-all shadow-md active:scale-95">
                        Claim Now
                    </button>
                    <button onClick={() => setIsOpen(false)} type="button" className="text-white/80 hover:text-white transition-colors p-1">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};