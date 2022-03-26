import axios from 'axios'
import { CreateFilmDto } from '../../dto/createFilm.dto'

export async function fetchFilmByID (id: number): Promise<CreateFilmDto> {
    const url = `${process.env.KINOPOISK_BASE_FILM_URL}${id}`
    try {
        const response = await axios.get(url, {
            headers: {
                'X-API-KEY': process.env.KINOPOISK_API_KEY
            }
        })
        return response.data
    } catch (e) {
        // if (e.response.status === 404) {
        //     return {id: id}
        // } else {
        //     console.log("Ошибка в fetchFilmByID: ", e)
        // }

    }
}

