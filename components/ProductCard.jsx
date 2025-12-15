'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Star, Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
    
    const dispatch = useDispatch()
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        dispatch(addToCart({ productId: product.id, quantity: 1 }));
        toast.success("Added to Cart!");
    }

    return (
        <Link href={`/product/${product.id}`}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className='group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 w-full overflow-hidden'
            >
                {/* Image Section */}
                <div className='block relative h-[280px] w-full bg-slate-50 overflow-hidden'>
                    <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill 
                        className='object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out'
                    />
                    
                    {/* Badges */}
                    <div className='absolute top-3 left-3 flex flex-col gap-2'>
                        {product.offerPrice && (
                            <span className='bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm'>
                                SALE
                            </span>
                        )}
                         <span className='bg-white/90 backdrop-blur text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border border-slate-100'>
                            {product.category}
                        </span>
                    </div>

                    {/* Hover Actions Overlay */}
                    <div className='absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    
                    {/* Floating Action Buttons */}
                    <div className='absolute bottom-6 left-0 right-0 flex justify-center gap-3 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10'>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
                            className='bg-slate-900 text-white p-3 rounded-full hover:bg-indigo-600 hover:scale-110 transition-all shadow-lg tooltip flex items-center justify-center' 
                            title="Add to Cart"
                        >
                            <ShoppingCart size={18} />
                        </button>
                        <button 
                            className='bg-white text-slate-900 p-3 rounded-full hover:bg-slate-100 hover:scale-110 transition-all shadow-lg border border-slate-100 flex items-center justify-center'
                            title="View Product"
                        >
                            <Eye size={18} />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className='p-5 pt-6'>
                    <h3 className='text-slate-800 font-bold text-lg truncate hover:text-indigo-600 transition-colors mb-1'>
                        {product.name}
                    </h3>

                    {/* Star Rating (Static for demo) */}
                    <div className='flex items-center gap-1 mb-3'>
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-slate-200 fill-slate-200" />
                        <span className='text-xs text-slate-400 ml-1 font-medium'>(4.2)</span>
                    </div>

                    {/* Price & Add Button */}
                    <div className='flex items-center justify-between mt-4 pt-4 border-t border-slate-50'>
                        <div className='flex flex-col'>
                            <span className='text-xs text-slate-400 font-medium'>Price</span>
                            <div className='flex items-baseline gap-2'>
                                <span className='text-lg font-bold text-slate-900'>{currency}{product.offerPrice || product.price}</span>
                                {product.offerPrice && (
                                    <span className='text-sm text-slate-400 line-through decoration-red-400'>{currency}{product.price}</span>
                                )}
                            </div>
                        </div>
                        
                        {/* Mini Add Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
                            className='w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all active:scale-95'
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default ProductCard