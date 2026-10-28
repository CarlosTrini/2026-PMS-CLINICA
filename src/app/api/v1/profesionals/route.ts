import { NextRequest, NextResponse } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";
import type { Professional } from "@/types/dataTypes";

export async function GET(request: NextRequest) {
    try {
        const { collectionFound } = await getCollectionsFn<Professional>('professionals');

        if (!collectionFound) {
            return NextResponse.json(
                { message: "No se ha podido obtener información." },
                { status: 500 }
            );
        }

        const professionals = await collectionFound.find({}).toArray();
        return NextResponse.json(professionals);
    } catch (error) {
        return NextResponse.json(
            { message: "Error al obtener profesionales." },
            { status: 500 }
        );
    }
}