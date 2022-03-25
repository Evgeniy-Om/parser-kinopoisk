import { updateFilmDto } from '../dto/updateFilm.dto'
import { FilmEntity } from '../entities/Film.entity'

export function generateListFilmsForUpdateInDb(listFilms: updateFilmDto[]) {

    const films: FilmEntity[] = []
    for (const film of listFilms) {
        const updateFilm = new FilmEntity()

        updateFilm.id = film.id
        updateFilm.imdb_id = film.imdb_id
        updateFilm.countries = film.production_countries
            ? film.production_countries.map(item => ({id: item.iso_3166_1}))
            : []
        updateFilm.is_updated = true

        films.push(updateFilm)
    }
    return films
}