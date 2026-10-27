import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getDefaultResponseApi } from '@/utils/dataTest/apiResponse';
import type { UserSystem } from '@/types/dataTypes';
import { SignJWT } from 'jose';

const PATH_TEST_USERS_SYSTEM = path.join(process.cwd(), 'src/utils/dataTest/usersSystemD.json');

// ================ EXTRA FUNC
const createToken = async (userFind: UserSystem) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'Token_secreto_default');
    const token = await new SignJWT({
        id: userFind.id,
        name: userFind.name + " " + userFind.lastName,
        email: userFind.email
    })
        .setProtectedHeader({ alg: 'HS256', 'typ': 'JWT' })
        .setExpirationTime('1h')
        .sign(secret);

    return token;
}

// ================================  METHODS
export async function POST(request: NextRequest) {
    const body = await request.json();

    let response = getDefaultResponseApi();

    // CAMPOS INCOMPLETOS
    if (Object.values(body).some((value) => value === '' || value === null || value === undefined)) {
        response.status = 400;
        response.errorMsg = "Todos los campos son requeridos";
        return NextResponse.json(response);
    }

    const users = JSON.parse(await fs.readFile(PATH_TEST_USERS_SYSTEM, 'utf-8')) as UserSystem[];

    // VALIDA QUE EXSISTA
    const userFind = users.find((u: UserSystem) => u.email === body.email) || null
    if (!userFind) {
        response.status = 404;
        response.errorMsg = "El usuario no existe";
        return NextResponse.json(response);
    }

    //VALIDA QUE CONTRASEÑA COINCIDA CON EL CORREO
    if (userFind.password !== body.password) {
        response.status = 400;
        response.errorMsg = "Revisar que ambos campos estén correctos";
        return NextResponse.json(response);
    }

    // CREA EL TOKEN
    const token = await createToken(userFind);

    const dataUser = {
        id: userFind.id,
        name: userFind.name + " " + userFind.lastName,
        email: userFind.email,
        role: userFind.role,
        picture: userFind.picture
    };

    response.data = {
        user: dataUser,
        token
    }

    return NextResponse.json(response);
}
