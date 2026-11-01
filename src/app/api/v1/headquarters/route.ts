import { NextResponse } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";

//trea data de la sede las sedes
export async function GET() {

    const { collectionFound } = await getCollectionsFn('headquarters');
    if (!collectionFound) return NextResponse.json({ message: `No se han podido obtener sedes` }, { status: 500 });

    const headquarters = await collectionFound.find({}).toArray();

    return NextResponse.json(headquarters, { status: 200 });
}

