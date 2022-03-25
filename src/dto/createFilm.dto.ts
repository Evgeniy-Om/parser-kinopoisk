import { Entity } from 'typeorm'

@Entity()
export class CreateFilmDto {
    id: number
    original_language: string
    original_title: string
    title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
}