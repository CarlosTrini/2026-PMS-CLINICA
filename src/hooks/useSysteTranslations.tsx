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
    const personalT = useTranslations("pages.personal");
    const personalMetricsT = useTranslations("pages.personal.Metrics");

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
        personalT,
        personalMetricsT,
    }
}
