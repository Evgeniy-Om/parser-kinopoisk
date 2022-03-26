import { Entity } from 'typeorm'

@Entity()
export class CreateFilmDto {
    kinopoiskId: number
    imdbId: string | null
    nameRu: string | null
    nameOriginal: string | null
    posterUrl: string
    posterUrlPreview: string
    ratingKinopoisk: number | null
    ratingKinopoiskVoteCount: number
    ratingImdb: number | null
    ratingImdbVoteCount: number
    webUrl: string
    year: number
    description: string | null
    type: string
    countries: [
        {
            country: string
        }
    ]
    genres: [
        {
            genre: string
        }
    ]
    serial: boolean
    shortFilm: boolean
    lastSync: string
}