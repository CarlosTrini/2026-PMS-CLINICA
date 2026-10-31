import { NextRequest, NextResponse } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";
import type { Personal } from "@/types/dataTypes";

export async function GET(request: NextRequest) {
    try {
        const { collectionFound } = await getCollectionsFn<Personal>('personal');

        if (!collectionFound) {
            return NextResponse.json(
                { message: "No se ha podido obtener información." },
                { status: 500 }
            );
        }

        let documents = await collectionFound.find({}).toArray();

        // if (documents.length === 0) {
        //  documents = await db.collection<Personal>('personal').find({}).toArray();
        // }

        // const personalList = documents.map((document) => {
        //     const { department: _legacyDepartment, ...personal } = document as typeof document & { department?: string };
        //     return {
        //         ...personal,
        //         locationAssignments: Array.isArray(personal.locationAssignments) ? personal.locationAssignments : [],
        //     };
        // });

        console.log(await collectionFound.find({}).toArray());
        return NextResponse.json(collectionFound);
    } catch (error) {
        return NextResponse.json(
            { message: "Error al obtener el personal." },
            { status: 500 }
        );
    }
}

