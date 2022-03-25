import { CreateFilmDto } from '../../dto/createFilm.dto'
import { fetchListFilms } from './fetchListFilms'

export async function getFilmsByDateRange(dateRange: [string, string]): Promise<CreateFilmDto[]> {

    let response = await fetchListFilms(dateRange, 1)
    let films = response.data.results
    let totalPages = response.data.total_pages
    console.log("totalPages: ", totalPages)
    console.log("totalFilms: ", response.data.total_results)

    if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page++) {
            response = await fetchListFilms(dateRange, page)
            films.push(...response.data.results)
        }
    }
    return films
}