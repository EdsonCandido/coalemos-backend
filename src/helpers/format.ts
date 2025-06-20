import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function manterApenasNumeros(str: string) {
    return `${str}`.replace(/\D/g, '');
}

/** 
* Retorna uma data no formato indicado.
* @param {string} date - date sql
* @param {string} formatStr - output date, by default yyyy-MM-dd HH:mm:ss
* @return {string} string
*/

export function formatDate(date: string,formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string{
    return format(date, formatStr, { locale: ptBR });
}