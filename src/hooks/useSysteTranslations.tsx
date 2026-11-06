import { useTranslations } from "next-intl";

export default function useSystemTraslations() {

    //Traducciones globales
    const commonT = useTranslations("common");
    const specialityT = useTranslations("speciality");
    const statusT = useTranslations("all_status");
    const departmentT = useTranslations("deparments");
    const formInputsT = useTranslations("formInputs");
    const tableColumnsT = useTranslations("tablesColumns");
    const rolesSystemT = useTranslations("rolesSystem");
    const servicesT = useTranslations("services");
    //página personal
    const personalPageT = useTranslations("pages.personal");
    const personalMetricsT = useTranslations("pages.personal.Metrics");
    //página sedes
    const headquartersPageT = useTranslations("pages.headquarters");
    //página servicios
    const servicesPageT = useTranslations("pages.services");
    //página departamentos
    const departmentsPageT = useTranslations("pages.departments");
    //página especialidades
    const specialitiesPageT = useTranslations("pages.specialities");




    return {
        commonT,
        specialityT,
        statusT,
        departmentT,
        tableColumnsT,
        formInputsT,
        rolesSystemT,
        servicesT,
        // página de personal
        personalPageT,
        personalMetricsT,
        // página de sedes
        headquartersPageT,
        // página de servicios
        servicesPageT,
        // página de departamentos
        departmentsPageT,
        // página de especialidades
        specialitiesPageT,
    }
}
