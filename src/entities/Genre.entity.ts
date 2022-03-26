import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('genre')
export class GenreEntity {

    @Column()
    id?: number

    @PrimaryColumn()
    name: string
}