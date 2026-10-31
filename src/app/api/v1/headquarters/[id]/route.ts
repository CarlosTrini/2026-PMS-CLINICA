import { NextResponse, NextRequest } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";
import type { Headquarters } from "@/types/dataTypes";

// trae sede por id

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: idHeadquarter } = await params;

    if (!idHeadquarter) {
        return NextResponse.json({ message: 'El id de la sede no es válido' }, { status: 404 });
    }

    const { collectionFound } = await getCollectionsFn<Headquarters>('headquarters');
    if (!collectionFound) return NextResponse.json({ message: `No se ha podido obtener sedes` }, { status: 500 });

    const headquarterSelected = await collectionFound.findOne({ id: idHeadquarter });

    if (!headquarterSelected) {
        return NextResponse.json({ message: `No se ha podido obtener la sede con el id: ${idHeadquarter}` }, { status: 404 });
    }

    return NextResponse.json(headquarterSelected, { status: 200 });
}