import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModels';
import { connect } from '@/dbConfig/dbConfig';
import jwt from 'jsonwebtoken';



connect();

export const GET = async () => {
    try {
        const res = NextResponse.json({ message: 'User logged out successfully' }); 
        const clear_token = res.cookies.set('token', '', { httpOnly: true, });
        return res; 
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);

    }
}
