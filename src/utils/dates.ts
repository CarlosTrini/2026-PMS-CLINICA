// import { es, enGB } from 'date-fns/locale'

const locales = {
    'es': 'es-ES',
    'en': 'en-EN',
}

export const simpleDate = (date: string) => {

    const dateObj = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        // hour: '2-digit',
        // minute: '2-digit'
    } as Intl.DateTimeFormatOptions;

    return dateObj.toLocaleDateString(locales['es'], options);
}