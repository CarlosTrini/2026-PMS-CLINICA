import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { UserSystem } from '@/types/dataTypes';
import { getDefaultResponseApi } from '@/utils/dataTest/apiResponse';
const PATH_TEST_USERS_SYSTEM = path.join(process.cwd(), 'src/utils/dataTest/usersSystemD.json');

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

    // lectura datos de usuarios
    const users = JSON.parse(await fs.readFile(PATH_TEST_USERS_SYSTEM, 'utf8'));

    // VERIFICAR SI EL CORREO YA EXISTE
    const userExists = users.some((user: UserSystem) => user.email === body.email);

    if (userExists) {
        response.message = "bad_request";
        response.errorMsg = 'El correo electrónico ya está registrado';
        return NextResponse.json(response, { status: 400 });
    }

    users.push(body);


    // actualizar data
    await fs.writeFile(PATH_TEST_USERS_SYSTEM, JSON.stringify(users, null, 2));

    response.message = `success`;
    return NextResponse.json(response);
}
