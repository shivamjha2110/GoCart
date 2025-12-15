import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create the store
export async function POST(request){
    try {
        const {userId} = getAuth(request)
        // Get the data from the form
        const formData = await request.formData()

        const name = formData.get("name")?.trim()
        const username = formData.get("username")?.trim()
        const description = formData.get("description")?.trim()
        const email = formData.get("email")?.trim()
        const contact = formData.get("contact")?.trim()
        const address = formData.get("address")?.trim()
        const image = formData.get("image")

        // Validate required fields
        if(!name || !username || !description || !email || !contact || !address){
            return NextResponse.json({error: "All text fields are required"}, {status: 400})
        }

        if(!image || !(image instanceof File)){
            return NextResponse.json({error: "Store logo image is required"}, {status: 400})
        }

        // Validate username format
        if(username.length < 3){
            return NextResponse.json({error: "Username must be at least 3 characters long"}, {status: 400})
        }

        if(!/^[a-zA-Z0-9_]+$/.test(username)){
            return NextResponse.json({error: "Username can only contain letters, numbers, and underscores"}, {status: 400})
        }

        // check is user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId}
        })

        // if store is already registered then send status of store
        if(store){
            return NextResponse.json({status: store.status})
        }

        // check is username is already taken
        const isUsernameTaken = await prisma.store.findFirst({
            where: { username: username.toLowerCase() }
        })

        if(isUsernameTaken){
            return NextResponse.json({error: "username already taken"}, {status: 400})
        }

        // image upload to imagekit
        let response;
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            response = await imagekit.upload({
                file: buffer,
                fileName: image.name,
                folder: "logos"
            })
        } catch (uploadError) {
            console.error('Image upload failed:', uploadError);
            return NextResponse.json({error: "Failed to upload store logo. Please try again."}, {status: 400})
        }

        const optimizedImage = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},
                { format: 'webp' },
                { width: '512' }
            ]
        })

        const newStore = await prisma.store.create({
            data: {
                userId,
                name,
                description,
                username: username.toLowerCase(),
                email,
                contact,
                address,
                logo: optimizedImage
            }
        })

        //  link store to user
        await prisma.user.update({
            where: { id: userId },
            data: {store: {connect: {id: newStore.id}}}
        })

        return NextResponse.json({message: "applied, waiting for approval"})

    } catch (error) {
        console.error('Store creation error:', error);

        // Handle specific database errors
        if(error.code === 'P2002'){
            return NextResponse.json({error: "Username or email already exists"}, { status: 400 })
        }

        // Handle other errors
        return NextResponse.json({
            error: error.message || "Failed to create store. Please try again."
        }, { status: 400 })
    }
}

// check is user have already registered a store if yes then send status of store

export async function GET(request) {
    try {
        const {userId} = getAuth(request)

        // check is user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId}
        })

        // if store is already registered then send status of store
        if(store){
            return NextResponse.json({status: store.status})
        }

        return NextResponse.json({status: "not registered"})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.code || error.message}, { status: 400 })
    }
}