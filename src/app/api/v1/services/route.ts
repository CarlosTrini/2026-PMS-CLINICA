import { NextResponse, NextRequest } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";
import type { Headquarters, Services } from "@/types/dataTypes";
import { Head } from "next/document";

// export async function GET(req: NextRequest) {

//     try {
//         const hqId = req.nextUrl.searchParams.get('headquarterId');

//         const { collectionFound } = await getCollectionsFn('headquarters');

//         if (!collectionFound) {
//             return NextResponse.json(
//                 { message: "No se ha podido obtener información." },
//                 { status: 500 }
//             );
//         }

//         const filterByHqIqId = hqId ? { id: hqId } : {};
//         let documents = await collectionFound.findOne(filterByHqIqId, { projection: { _id: 0, services: 1 } });

//         return NextResponse.json(documents?.services ?? []);
//     } catch (error) {
//         return NextResponse.json({
//             success: false,
//             message: "Failed to fetch services"
//         }, { status: 500 });
//     }

// }

export async function GET(req: NextRequest) {

    try {
        const hqId = req.nextUrl.searchParams.get('headquarterId');
        const page = Number(req.nextUrl.searchParams.get('page') || 1);
        const limit = Number(req.nextUrl.searchParams.get('limit') || 10);

        const { collectionFound } = await getCollectionsFn<Headquarters>('headquarters');

        if (!collectionFound) {
            return NextResponse.json(
                { message: "No se ha podido obtener información." },
                { status: 500 }
            );
        }



        const filterByHqIqId = hqId ? { id: hqId } : {};
        let documents = await collectionFound.findOne(filterByHqIqId, { projection: { _id: 0, services: 1 } });

        // PÁGINNACIÓN
        const allServices = documents?.services ?? [];
        const total = allServices.length;
        const totalPages = Math.ceil(total / limit);

        // como los servicios son un arreglo no colecciones, se usa slice para paginarlo...
        // Una sede al no tener cientos o miles de registros, el proceso es rápido
        const startIndex = (page - 1) * limit;
        const paginatedServices = allServices.slice(startIndex, (startIndex + limit)); //los servicios

        const responseData = {
            docs: paginatedServices,
            totalDocs: total,
            totalPages,
            page,
            limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            prevPage: page > 1 ? (page - 1) : null,
            nextPage: page < totalPages ? (page + 1) : null
        }
        return NextResponse.json(responseData)
        // return NextResponse.json(documents?.services ?? []);
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

        // no existe sede
        if (deleteService.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'No se encontró el servicio en la sede' },
                { status: 404 }
            );
        }

        // si hay sede pero no srevicio con ese id
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
