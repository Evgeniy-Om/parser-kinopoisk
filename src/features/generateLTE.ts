import { add, format } from 'date-fns'

// возвращает строку в формате 'yyyy-MM-dd'
export function generateLTE (year: number, month: number): string {
    const result = add(new Date(year, month, 1), {
        months: 0, // в библиотеке 'date-fns' 1 месяц равен нулю, два месяца - 1
        days: -1 // отнимаю 1 день чтобы получить последний день предыдущего месяца
    })
    const formattedResult = format(result, 'yyyy-MM-dd')
    return formattedResult
}