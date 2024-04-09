import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModels';
import { connect } from '@/dbConfig/dbConfig';
import jwt from 'jsonwebtoken';



connect();

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody)
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 400 });
        }
        console.log(user);
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            console.log("password does not match");
            return NextResponse.json({ error: "Invalid credentials" , status: 400 });
        }
        console.log("password match");
        const payload = { 
            id: user._id,
            username: user.name,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
        const res = NextResponse.json({ message: 'User logged in successfully' });
        const to = res.cookies.set('token', token, { httpOnly: true, });
        console.log(to)
        return res; 
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);

    }
}
