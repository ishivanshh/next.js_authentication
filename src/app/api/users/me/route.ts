import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel.ts";
import {connect} from "@/src/dbConfig/dbConfig";

connect();

export async function GET(request : NextRequest){
    try {
        const userID = await getDataFromToken
        (request);
        const user = User.findOne({_id : userID}).select("-password");
        return NextResponse.json({
            message : "User Found",
            data : user
        })
    } catch (error:any) {
        return NextResponse.json({error : error.message}, {status : 400});
    }
}
