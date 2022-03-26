import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'
import { GenreEntity } from './Genre.entity'
import { CountryEntity } from './Country.entity'

@Entity('film')
export class FilmEntity {

    @PrimaryColumn()
    id: number

    @Column({nullable: true, default: null})
    imdb_id: string

    @Column({nullable: true, default: null})
    title_original: string

    @Column({nullable: true, default: null})
    title_ru: string

    @Column({nullable: true, default: null})
    description: string


    @Column({nullable: true, default: null})
    poster_url: string

    @Column({nullable: true, default: null})
    poster_url_preview: string

    @Column({nullable: true, default: null})
    year: number

    @Column({type: 'float', nullable: true, default: null})
    rating_kinopoisk: number

    @Column({nullable: true, default: null})
    rating_kinopoisk_vote_count: number

    @Column({type: 'float', nullable: true, default: null})
    rating_imdb: number

    @Column({nullable: true, default: null})
    rating_imdb_vote_count: number

    @Column({nullable: true, default: null})
    web_url: string

    @Column()
    type: string

    @Column()
    short_film: boolean

    @Column()
    serial: boolean

    @Column()
    last_sync: Date

    @ManyToMany(() => CountryEntity, {nullable: true})
    @JoinTable({name: 'films_countries'})
    countries: CountryEntity[]

    @ManyToMany(() => GenreEntity, {nullable: true})
    @JoinTable({name: 'films_genres'})
    genres: GenreEntity[]

}