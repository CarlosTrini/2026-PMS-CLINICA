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
    //página personal
    const profT = useTranslations("pages.profesionals");
    const profMetricsT = useTranslations("pages.profesionals.Metrics");

    return {
        commonT,
        specialityT,
        statusT,
        departmentT,
        tableColumnsT,
        formInputsT,
        rolesSystemT,
        // página de personal
        profT,
        profMetricsT,
    }
}