import { NextRequest, NextResponse } from 'next/server';
import type { AuthLogin, Headquarters, UserSession, UserSystem } from '@/types/dataTypes';
import { SignJWT } from 'jose';
import { getCollectionsFn } from '@/lib/mongodb';

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
};

const getHeadquarter = async (id: string) => {

    const { collectionFound } = await getCollectionsFn<Headquarters>("headquarters");
    return collectionFound;
};

// ================================  METHODS
export async function POST(request: NextRequest) {
    const body = await request.json();

    // CAMPOS INCOMPLETOS
    const requiredFields: (keyof AuthLogin)[] = [
        'email',
        'password'
    ];
    const hasEmptyFields = requiredFields.some((field) => !body[field]);
    if (hasEmptyFields) {
        return NextResponse.json({ message: "Todos los campos son requeridos" }, { status: 400 });
    }

    // revisar usuario
    const { collectionFound } = await getCollectionsFn<UserSystem>("usersSystem");
    const userFind = await collectionFound.findOne({ email: body.email });

    // VALIDA QUE EXISTA
    if (!userFind) {
        return NextResponse.json({ message: "El usuario no existe" }, { status: 404 });
    }

    // TRAER LA DATA COMPLETA DEL USUARIO 
    // TRAER LA DATA DE LA EMPRESA


    // VALIDA QUE CONTRASEÑA COINCIDA CON EL CORREO
    if (userFind.password !== body.password) {
        return NextResponse.json({ message: "Revisar que ambos campos estén correctos" }, { status: 400 });
    }

    // CREA EL TOKEN
    const token = await createToken(userFind);

    const dataUser: UserSession = {
        id: userFind.id,
        name: userFind.name + " " + userFind.lastName,
        email: userFind.email,
        role: userFind.role,
        picture: userFind.picture || '',
        idEnterprise: userFind.idEnterprise || ''
    };

    return NextResponse.json({
        user: dataUser,
        token
    });
}
