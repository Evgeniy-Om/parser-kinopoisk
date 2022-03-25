import { format } from 'date-fns'

// возвращает строку в формате 'yyyy-MM-dd'
export function generateGTE (year: number, month: number): string {
    return format(new Date(year, month-1, 1), 'yyyy-MM-dd')
}