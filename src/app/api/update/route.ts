import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    revalidatePath('/');

    return NextResponse.json({
        message: 'OK'
    });
}