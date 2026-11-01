'use client'
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { Building, Calendar, Eye, Mail, Phone, PlusCircle, Trash2 } from 'lucide-react';
import Fallback from "@/components/fallbackQuery/Fallback";

import { useQuery } from '@tanstack/react-query';

import useSystemTraslations from "@/hooks/useSysteTranslations";
import { HeadquartersService } from "./services/headquartersService";
import Metrics from "./components/Metrics";
import { HEADQUARTERS_DATA } from "@/utils/constants";
import type { Headquarters } from "@/types/dataTypes";
import CardHeadquarter from "./components/CardHeadquarter";



export default function HeadquartersView() {

    // TRADUCCIONES
    const { headquartersT } = useSystemTraslations();

    // QUERY
    const { data: headquartersData, isError, error, isLoading } = useQuery({
        queryKey: ['headquarters-view'],
        queryFn: () => HeadquartersService.getAllHeadquarters(),
    });






    return (
        <>
            <PageBreadcrumb pageTitle={headquartersT('title')} />


            <Metrics />

            <Fallback
                id='headquartersView'
                key={'headquarters-view'}
                isLoading={isLoading}
                isError={isError}
                loadingClassName="min-h-90"
                errorClassName="min-h-90"
                data={headquartersData}

            >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 px-3 py-10">

                    {
                        headquartersData?.map((h) => <CardHeadquarter data={h} />)
                    }
                </div>

            </Fallback>


        </>
    );
};