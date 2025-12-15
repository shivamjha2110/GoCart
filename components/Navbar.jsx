'use client'
import { PackageIcon, Search, ShoppingCart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Added useEffect
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { useUser, useClerk, UserButton, Protect } from "@clerk/nextjs"
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { clearCart } from "@/lib/features/cart/cartSlice"; // Import the clear action

const Navbar = () => {
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const router = useRouter();
    const dispatch = useDispatch(); // Initialize dispatch
    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)
    
    // --- FIX FOR ISSUE 2: Clear cart on logout ---
    useEffect(() => {
        // If there is no user (user logged out), clear the cart state
        if (!user) {
            dispatch(clearCart());
        }
    }, [user, dispatch]);
    // ---------------------------------------------
    
    // Scroll Logic for Glass UI
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled 
                ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50" 
                : "bg-white border-b border-transparent"
            }`}
        >
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    {/* Updated Logo: GoToCart */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-slate-900 transition-colors">
                            <ShoppingBag className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                            GoTo<span className="text-indigo-600">Cart</span>
                            <span className="text-indigo-600">.</span>
                        </h1>
                        <Protect plan='plus'>
                             <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
                            PLUS
                            </span>
                        </Protect>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600 font-medium text-sm">
                        <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
                        <Link href="/shop" className="hover:text-indigo-600 transition">Shop</Link>
                        
                        {/* UPDATED LINKS HERE */}
                        <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
                        <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-72 text-sm gap-2 bg-slate-100/50 border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all px-4 py-2.5 rounded-full">
                            <Search size={18} className="text-slate-400" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-400" type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition">
                            <ShoppingCart size={20} />
                            <span className="max-lg:hidden">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 left-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        { !user ? (
                            <button onClick={openSignIn} className="px-6 py-2 bg-slate-900 hover:bg-slate-800 transition text-white text-sm font-medium rounded-full shadow-lg shadow-slate-900/20">
                                Login
                            </button>
                        ) : (
                            <UserButton appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-8 w-8",
                                    userButtonTrigger: "focus:shadow-none"
                                }
                            }}>
                                <UserButton.MenuItems>
                                    <UserButton.Action labelIcon={<PackageIcon size={16}/>} label="My Orders" onClick={()=> router.push('/orders')}/>
                                </UserButton.MenuItems>
                            </UserButton>
                        )}
                    </div>

                    {/* Mobile User Button */}
                    <div className="sm:hidden flex items-center gap-4">
                        { user ? (
                            <div className="flex gap-4 items-center">
                                <Link href='/cart' className="relative">
                                     <ShoppingCart size={20} className="text-slate-600"/>
                                     <span className="absolute -top-2 -right-2 text-[10px] text-white bg-indigo-600 w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                                </Link>
                                <UserButton appearance={{
                                    elements: {
                                        userButtonAvatarBox: "h-8 w-8",
                                        userButtonTrigger: "focus:shadow-none"
                                    }
                                }}>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16}/>} label="My Orders" onClick={()=> router.push('/orders')}/>
                                    </UserButton.MenuItems>
                                </UserButton>
                            </div>
                        ) : (
                            <button onClick={openSignIn} className="px-5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-sm transition text-white rounded-full">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar