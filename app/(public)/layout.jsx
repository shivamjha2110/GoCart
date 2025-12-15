'use client'
import Banner from "@/components/Banner.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/product/productSlice.js";
import { useUser, useAuth } from "@clerk/nextjs";
import { fetchCart, uploadCart, loadCartFromStorage } from "@/lib/features/cart/cartSlice.js";
import { fetchAddress } from "@/lib/features/address/addressSlice.js";
import { fetchUserRatings } from "@/lib/features/rating/ratingSlice.js";

export default function PublicLayout({ children }) {

    const dispatch = useDispatch()
    const {user} = useUser()
    const {getToken} = useAuth()

    const {cartItems} = useSelector((state)=>state.cart)

    useEffect(()=>{
        // Only fetch products if we're in browser environment (not during build)
        if (typeof window !== 'undefined') {
            dispatch(fetchProducts({}))
            dispatch(loadCartFromStorage())
        }
    },[])

    useEffect(()=>{
        // Only fetch user data if user exists and we're in browser environment
        if(user && typeof window !== 'undefined'){
            dispatch(fetchCart({getToken}))
            dispatch(fetchAddress({getToken}))
            dispatch(fetchUserRatings({getToken}))
        }
    },[user])

    useEffect(()=>{
        // Only upload cart if user exists and we're in browser environment
        if(user && typeof window !== 'undefined'){
            dispatch(uploadCart({getToken}))
        }
    },[cartItems])




    return (
        <>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
