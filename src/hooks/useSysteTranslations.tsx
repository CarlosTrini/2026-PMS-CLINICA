import { useTranslations } from "next-intl";

export default function useSystemTraslations() {

    //Traducciones globales
    const commonT = useTranslations("common");
    const specialityT = useTranslations("speciality");
    const statusT = useTranslations("all_status");
    const departmentT = useTranslations("deparments");
    //página personal
    const profT = useTranslations("pages.profesionals");
    const profMetricsT = useTranslations("pages.profesionals.Metrics");
    const profTableT = useTranslations("pages.profesionals.table");
    const profFiltersT = useTranslations("pages.profesionals.filters");

    return {
        commonT,
        specialityT,
        statusT,
        departmentT,
        profT,
        profMetricsT,
        profTableT,
        profFiltersT
    }
}