import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('country')
export class CountryEntity {

    @Column()
    id?: string

    @PrimaryColumn()
    name: string
}