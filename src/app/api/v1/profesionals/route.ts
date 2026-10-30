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

        const documents = await collectionFound.find({}).toArray();
        // Legacy documents may still store a single professional-level department.
        // Keep the database untouched and expose the new response shape to clients.
        const professionals = documents.map((document) => {
            const { department: _legacyDepartment, ...professional } = document as typeof document & { department?: string };
            return {
                ...professional,
                locationAssignments: Array.isArray(professional.locationAssignments) ? professional.locationAssignments : [],
            };
        });
        return NextResponse.json(professionals);
    } catch (error) {
        return NextResponse.json(
            { message: "Error al obtener profesionales." },
            { status: 500 }
        );
    }
}
