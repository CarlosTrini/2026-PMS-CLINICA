import { NextResponse, NextRequest } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";

export async function GET(req: NextRequest, { params }: { params: { id_headquarter: string } }) {
    try {
        const { collectionFound } = await getCollectionsFn('personal');
        if (!collectionFound) {
            return NextResponse.json(
                { message: "No se ha podido obtener información." },
                { status: 500 }
            );
        }

        const documents = await collectionFound.find({}).toArray();
        console.log('HEADQUARTGERS ==>', documents)
        if (documents.length == 0) {
            return NextResponse.json(
                { message: "No se han encontrado coincidencias" },
                { status: 200 }
            );
        }

        return NextResponse.json(documents);

    } catch (err) {
        return NextResponse.json(
            { message: "Error al obtener el personal de la sede." },
            { status: 500 }
        );
    }

}