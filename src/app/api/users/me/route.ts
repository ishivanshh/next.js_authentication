import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel.js";
import { connect } from "@/src/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await connect();

        const userID = await getDataFromToken(request);
        const user = await User.findById(userID).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User Found",
            data: user,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
