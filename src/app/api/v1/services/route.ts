import { NextResponse, NextRequest } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";
import type { Headquarters, Services } from "@/types/dataTypes";
import { success } from "zod";


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
        let documents = await collectionFound.findOne(filterByHqIqId, { projection: { _id: 0, services: 1 } });

        return NextResponse.json(documents?.services ?? []);
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch services"
        }, { status: 500 });
    }

}

export async function POST(req: NextRequest) {
    try {
        const hqId = req.nextUrl.searchParams.get('headquarterId');
        const body = await req.json();

        if (!hqId) {
            return NextResponse.json(
                { message: "El Id de la sede y/o servicio es requerido" },
                { status: 400 }
            );
        }

        // COLECCIONES
        const { collectionFound } = await getCollectionsFn<Headquarters>('headquarters');

        if (!collectionFound) {
            return NextResponse.json(
                { message: "Ha ocurrido un error al encontrar la sede" },
                { status: 500 }
            );
        }

        // AGREGAR EL SERVICIO
        const result = await collectionFound.updateOne(
            { id: hqId },
            { $push: { services: body } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "No se ha encontrado la sede." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Servicio agregado correctamente' },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to add services"
        }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest) {

    try {

        const idHq = req.nextUrl.searchParams.get('headquarterId');
        const body = await req.json() as Services;

        if (!idHq || !body?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'El Id de la sede y/o servicio es requerido'
                },
                {
                    status: 400
                }

            );
        }

        // COLECCIÓN
        const { collectionFound } = await getCollectionsFn<Headquarters>('headquarters');

        if (!collectionFound) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No se ha encontrado la sede'
                },
                {
                    status: 404
                }
            );
        }

        // UPDATE
        const updateService = await collectionFound.updateOne(
            { id: idHq, 'services.id': body.id },
            {
                $set: {
                    'services.$.name': body.name,
                    'services.$.isActive': body.isActive,
                    'services.$.updatedAt': body.updatedAt
                }
            }
        )

        if (updateService.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'No se encontró el servicio en la sede' },
                { status: 404 }
            );
        }

        // OK
        return NextResponse.json(
            { success: true, message: 'Servicio actualizado correctamente' },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to add services"
        }, { status: 500 });
    }


}


export async function DELETE(req: NextRequest) {

    try {

        const idHq = req.nextUrl.searchParams.get('headquarterId');
        const serviceId = req.nextUrl.searchParams.get('serviceId');


        if (!idHq || !serviceId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'El Id de la sede y/o servicio es requerido'
                },
                {
                    status: 400
                }

            );
        }

        // COLECCIÓN
        const { collectionFound } = await getCollectionsFn<Headquarters>('headquarters');

        if (!collectionFound) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No se ha encontrado la sede'
                },
                {
                    status: 404
                }
            );
        }

        // DELETE
        const deleteService = await collectionFound.updateOne(
            { id: idHq },
            { $pull: { services: { id: serviceId } } }
        );

        if (deleteService.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'No se encontró el servicio en la sede' },
                { status: 404 }
            );
        }

        if (deleteService.modifiedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'No se encontró el servicio en la sede' },
                { status: 404 }
            );
        }

        // OK
        return NextResponse.json(
            { success: true, message: 'Servicio eliminado correctamente' },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to add services"
        }, { status: 500 });
    }


}
