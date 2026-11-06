import { NextResponse, NextRequest } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";


export async function GET(req: NextRequest) {

    try {
        const hqId = req.nextUrl.searchParams.get('headquarterId');

        const { collectionFound } = await getCollectionsFn('headquarters');

        if (!collectionFound) {
            return NextResponse.json(
                { message: "No se ha podido obtener información." },
                { status: 500 }
            );
        }

        const filterByHqIqId = hqId ? { id: hqId } : {};
        let documents = await collectionFound.findOne(filterByHqIqId, { projection: { _id: 0, specialities: 1 } });
        return NextResponse.json(documents?.specialities ?? []);
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch specialities"
        }, { status: 500 });
    }

}