import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { findIsNotProcessedFilms } from './features/db/findIsNotProcessedFilms'
import { updateListFilms } from './features/db/updateListFilms'

createConnection().then(async () => {

    const listFilmsIdsFromDb = await findIsNotProcessedFilms(100000)
    await updateListFilms(listFilmsIdsFromDb)

    console.log('Finish')

}).catch(error => console.error('Ошибка в index.ts: ', error))
