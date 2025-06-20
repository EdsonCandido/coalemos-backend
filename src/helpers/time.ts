import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dtHoje = (formatStr = 'yyyy-MM-dd HH:mm:ss'): string => {
    return format(new Date(), formatStr, { locale: ptBR });
}