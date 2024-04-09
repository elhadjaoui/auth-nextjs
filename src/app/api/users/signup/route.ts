import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import  User  from '@/models/userModels'; 
import { connect } from '@/dbConfig/dbConfig';



connect();

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { email, password, username } = reqBody;

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: 'User already exists' });
        }
        const newUser = new User({
            email,
            password: hashedPassword,
            name: username
        });
        await newUser.save();
        return NextResponse.json(
            {
                message: 'User created successfully',
                user: newUser
            }
        );

    } catch (error) {
        return NextResponse.json(error);
    }
}
