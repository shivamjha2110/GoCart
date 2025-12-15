'use client'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { PackageSearch } from 'lucide-react'
import { motion } from 'framer-motion'

const BestSelling = () => {

    const products = useSelector(state => state.product.list)
    const displayQuantity = 4

    return (
        // 'py-24' gives top/bottom padding so content doesn't hit the edges
        // 'h-auto' allows the section to grow as products are added
        <section className='py-24 px-6 h-auto w-full'>
            <div className='max-w-7xl mx-auto'>
                <Title
                    title='Best Sellers'
                    description="Our most popular products loved by thousands."
                    href='/shop'
                />

                {products && products.length > 0 ? (
                    // Grid Layout: Items will wrap automatically, pushing content down
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-10'>
                        {products
                            .slice()
                            // Simple sort by price as placeholder for 'popularity'
                            .sort((a, b) => b.price - a.price)
                            .slice(0, displayQuantity)
                            .map((product, index) => (
                                <ProductCard key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto mt-10'>
                        <div className='w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-500'>
                            <PackageSearch size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-2'>Best Sellers Coming Soon</h3>
                        <p className='text-slate-500 max-w-md'>Our top products will be featured here soon.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BestSelling