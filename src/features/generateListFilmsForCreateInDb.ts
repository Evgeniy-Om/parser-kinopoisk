import { FilmEntity } from '../entities/Film.entity'
import { CreateFilmDto } from '../dto/createFilm.dto'

export function generateListFilmsForCreateInDb(listFilms: CreateFilmDto[]) {

    const films: FilmEntity[] = []
    for (const film of listFilms) {
        const newFilm = new FilmEntity()

        newFilm.id = film.id
        newFilm.original_language = film.original_language
        newFilm.original_title = film.original_title
        newFilm.overview = film.overview.length ? film.overview : null
        newFilm.popularity = film.popularity
        newFilm.poster_path = film.poster_path
        newFilm.release_date = new Date(film.release_date)
        newFilm.title = film.title
        newFilm.vote_average = film.vote_average
        newFilm.vote_count = film.vote_count
        newFilm.genres = film.genre_ids.length
            ? film.genre_ids.map(item => ({id: item}))
            : null

        films.push(newFilm)
    }
    return films
}