import {connect} from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

export const runtime = "nodejs";

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Something went wrong";
}


export async function POST(request: NextRequest){
    try {
        await connect();

        const reqBody = await request.json()
        const username = reqBody.username?.trim();
        const email = reqBody.email?.trim().toLowerCase();
        const password = reqBody.password;

        console.log("requested body :" ,reqBody);
        console.log(username , email , password);
        if (!username || !email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }

        //check if user already exists
        const user = await User.findOne({email})
        console.log("Existing user:" , user);
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email

        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error: unknown) {
        return NextResponse.json({error: getErrorMessage(error)}, {status: 500})

    }
}
