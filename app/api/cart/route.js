import prisma from "@/lib/prisma";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// Update user cart 
export async function POST(request){
    try {
        const { userId } = getAuth(request)
        
        if(!userId){
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { cart } = await request.json()

        let user = await prisma.user.findUnique({
            where: {id: userId}
        })

        // If user doesn't exist, create them
        if(!user){
            try {
                // Get user data from Clerk using server client
                const clerk = await clerkClient()
                const clerkUser = await clerk.users.getUser(userId)
                
                user = await prisma.user.create({
                    data: {
                        id: userId,
                        email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
                        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
                        image: clerkUser.imageUrl || '',
                    }
                })
            } catch (createError) {
                console.error('Failed to create user:', createError)
                return NextResponse.json({ error: 'Failed to initialize user account' }, { status: 500 })
            }
        }

        // Save the cart to the user object
        await prisma.user.update({
            where: {id: userId},
            data: {cart: cart}
        })

        return NextResponse.json({ message: 'Cart updated' })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

// Get user cart 
export async function GET(request){
    try {
        const { userId } = getAuth(request)
        
        if(!userId){
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        let user = await prisma.user.findUnique({
            where: {id: userId}
        })

        // If user doesn't exist, create them (fallback for when Inngest fails)
        if(!user){
            try {
                // Get user data from Clerk using server client
                const clerk = await clerkClient()
                const clerkUser = await clerk.users.getUser(userId)
                
                user = await prisma.user.create({
                    data: {
                        id: userId,
                        email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
                        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
                        image: clerkUser.imageUrl || '',
                    }
                })
            } catch (createError) {
                console.error('Failed to create user:', createError)
                return NextResponse.json({ error: 'Failed to initialize user account' }, { status: 500 })
            }
        }

        return NextResponse.json({ cart: user.cart || {} })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}