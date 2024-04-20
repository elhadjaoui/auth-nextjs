
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModels';
import { log } from "console";



connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log('token === ', reqBody)
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpire: { $gt: Date.now() }
        })
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        console.log(user); 
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        user.isVerified = true;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}