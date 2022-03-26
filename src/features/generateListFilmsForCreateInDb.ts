import { FilmEntity } from '../entities/Film.entity'
import { CreateFilmDto } from '../dto/createFilm.dto'

export function generateListFilmsForCreateInDb(listFilms: CreateFilmDto[]) {
    const films: FilmEntity[] = []
    for (const film of listFilms) {
        const newFilm = new FilmEntity()

        newFilm.id = film.kinopoiskId
        newFilm.imdb_id = film.imdbId

        newFilm.title_ru = film.nameRu
        newFilm.title_original = film.nameOriginal
        newFilm.description = film.description

        newFilm.poster_url = film.posterUrl
        newFilm.poster_url_preview = film.posterUrlPreview

        newFilm.rating_kinopoisk = film.ratingKinopoisk
        newFilm.rating_kinopoisk_vote_count = film.ratingKinopoiskVoteCount
        newFilm.rating_imdb = film.ratingImdb
        newFilm.rating_imdb_vote_count = film.ratingImdbVoteCount

        newFilm.year = film.year
        newFilm.web_url = film.webUrl
        newFilm.type = film.type
        newFilm.short_film = film.shortFilm
        newFilm.serial = film.serial

        newFilm.genres = film.genres.map(item => ({name: item.genre})).filter(i => i.name !== '')

        newFilm.countries = film.countries.map(item => ({name: item.country})).filter(i => i.name !== '')

        newFilm.last_sync = new Date(film.lastSync)

        films.push(newFilm)
    }
    return films
}