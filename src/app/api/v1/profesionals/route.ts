import { NextRequest, NextResponse } from "next/server";
import { getCollectionsFn } from "@/lib/mongodb";
import type { Professional } from "@/types/dataTypes";

import { getDefaultResponseApi } from "@/utils/dataTest/apiResponse";

export async function GET(request: NextRequest) {
    const responseApi = getDefaultResponseApi();

    const { collectionFound } = await getCollectionsFn<Professional[]>('professionals');

    if (!collectionFound) {
        responseApi.message = 'bad_request';
        responseApi.errorMsg = "No se han podido encontrar datos. Intente de nuevo.";
        return NextResponse.json(responseApi, { status: 400 });
    }

    const professionals = await collectionFound.find({}).toArray();
    responseApi.data = professionals;
    return NextResponse.json(responseApi);

}