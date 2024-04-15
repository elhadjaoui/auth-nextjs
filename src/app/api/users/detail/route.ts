import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModels';
import { getDataFromTokens } from '@/helpers/getDataFromTokens';
import { connect } from '@/dbConfig/dbConfig';

connect();
export const GET = async (req: NextRequest) => {
    try {
        const userId = await getDataFromTokens(req);
        const user = await User.findOne({ _id: userId }).select('-password');
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(error);
    }
}