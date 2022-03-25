import {addListFilmsPerOneYear} from "./addListFilmsPerOneYear"

export async function addListFilmsPerYears(fromYear: number, toYear: number) {
    for (let year = fromYear; year < toYear; year++) {
        await addListFilmsPerOneYear(year)
    }
}


