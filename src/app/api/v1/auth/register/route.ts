import { NextRequest, NextResponse } from 'next/server';
import { UserSystem } from '@/types/dataTypes';
import { getDefaultResponseApi } from '@/utils/dataTest/apiResponse';
import { getCollectionsFn } from '@/lib/mongodb';

// const getCollections = async () => {
//     const client = await clientDB;
//     const db = client.db("pms-clinic-database");
//     const usersSystemCollection = await db.collection<UserSystem>('usersSystem');

//     return {
//         db,
//         usersSystemCollection,
//     }
// }


export async function POST(request: NextRequest) {
    const body = await request.json() as UserSystem;

    let response = getDefaultResponseApi();

    const requiredFields: (keyof UserSystem)[] = [
        'name',
        'lastName',
        'email',
        'password',
        'role',
        'createdAt',
        'updatedAt',
        'termsAndConditions'
    ];
    const hasEmptyFields = requiredFields.some((field) => !body[field]);
    if (hasEmptyFields) {
        response.message = "bad_request";
        response.errorMsg = 'Campos incompletos';
        return NextResponse.json(response, { status: 400 });
    }

    // GETDATA DB
    const { collectionFound } = await getCollectionsFn<UserSystem>("usersSystem");
    const user = await collectionFound.findOne({ email: body.email });

    // ==== VERIFICAR SI EL CORREO YA EXISTE
    // Verificar si el usuario existe en la collection
    if (user) {
        response.message = "bad_request";
        response.errorMsg = 'El correo electrónico ya está registrado';
        return NextResponse.json(response, { status: 400 });
    }



    // ==== actualizar data
    const result = await collectionFound.insertOne(body);

    if (!result.acknowledged) {
        response.message = "error";
        response.errorMsg = 'Error al registrar el usuario';
        return NextResponse.json(response, { status: 500 });
    }

    response.message = `success`;
    return NextResponse.json(response);
}
