import {FilmEntity} from '../../entities/Film.entity'
import {getManager} from 'typeorm'

export function saveInDb(listFilms: FilmEntity[]) {
    listFilms.forEach(async (i) => {
        try {
            // console.log(i)
            await getManager().save(i)
        } catch (e) {
            console.log(e.message)
            console.log(i)
        }
    })

}