// import { NextRequest, NextResponse } from 'next/server';
// import { getCollectionsFn } from '@/lib/mongodb';

// export async function POST(request: NextRequest) {
//     const body = await request.json();

//     const requiredFields = [
//         'name',
//         'lastName',
//         'email',
//         'password',
//         'role',
//         'createdAt',
//         'updatedAt',
//         'termsAndConditions'
//     ];
//     const hasEmptyFields = requiredFields.some((field) => !body[field]);
//     if (hasEmptyFields) {
//         return NextResponse.json({ message: 'Campos incompletos' }, { status: 400 });
//     }

//     // GETDATA DB
//     const { collectionFound } = await getCollectionsFn("usersSystem");
//     const user = await collectionFound.findOne({ email: body.email });

//     // VERIFICAR SI EL CORREO YA EXISTE
//     if (user) {
//         return NextResponse.json({ message: 'El correo electrónico ya está registrado' }, { status: 400 });
//     }

//     // Insertar nuevo usuario
//     const result = await collectionFound.insertOne(body);

//     if (!result.acknowledged) {
//         return NextResponse.json({ message: 'Error al registrar el usuario' }, { status: 500 });
//     }

//     return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 201 });
// }

export {};

