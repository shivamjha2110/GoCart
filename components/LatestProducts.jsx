'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { PackageOpen } from 'lucide-react'

const LatestProducts = () => {

    const products = useSelector(state => state.product.list)
    const displayQuantity = 8

    return (
        // ADDED id="new-arrivals" HERE
        <section id="new-arrivals" className='py-24 px-6 h-auto w-full'>
            <div className='max-w-7xl mx-auto'>
                <Title 
                    title='New Arrivals' 
                    description="Explore our latest collection of premium gadgets." 
                    href='/shop' 
                />

                {products && products.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-10'>
                        {products
                            .slice()
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, displayQuantity)
                            .map((product, index) => (
                                <ProductCard key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto mt-10'>
                        <div className='w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-500'>
                            <PackageOpen size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-2'>Collection Coming Soon</h3>
                        <p className='text-slate-500 max-w-md'>We are currently curating the best tech for you.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default LatestProducts