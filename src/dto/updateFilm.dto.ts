import { Entity } from 'typeorm'

type Country = {
    iso_3166_1: string,
    name?: string
}
@Entity()
export class updateFilmDto {
    id: number
    imdb_id?: string
    production_countries?: Country[]
    name?: string
}