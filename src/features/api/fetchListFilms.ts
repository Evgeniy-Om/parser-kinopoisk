import { CreateFilmDto } from '../../dto/createFilm.dto'
import axios from 'axios'

type ResponseTypes = {
    data: {
        page: number
        results: CreateFilmDto[]
        total_pages: number
        total_results: number
    }
}
export function fetchListFilms(dateRange: [string, string], page): Promise<ResponseTypes> {
    try {
        const response =  axios.get(process.env.TMDB_DISCOVER_URL, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'ru-RU',
                include_adult: false,
                page,
                'primary_release_date.gte': dateRange[0],
                'primary_release_date.lte': dateRange[1]
            }
        })
        return response
    } catch (e) {
        console.log("fetchListFilms: ", e)
    }
}