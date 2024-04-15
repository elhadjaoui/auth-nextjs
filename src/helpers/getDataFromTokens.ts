import { NextRequest } from "next/server";
import toast from "react-hot-toast";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { user } from "./types";


export const getDataFromTokens = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedtoken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedtoken.id;
    } catch (error:any) {
        console.log(error);
        toast.error(error.message);
    }

}