import { saveInDb } from './saveInDb'
import { updateFilmDto } from '../../dto/updateFilm.dto'
import { fetchFilmByID } from '../api/fetchFilmByID'
import { generateListFilmsForUpdateInDb } from '../generateListFilmsForUpdateInDb'
import { findIsNotUpdatedFilms } from './findIsNotUpdatedFilms'
import { performance } from 'perf_hooks'

const LIMIT_REQUEST = 100 // Увеличение до 150 и более может привести к ошибке ETIMEDOUT

// При получении списка фильмов в итоговом результате нет полей: страна-производитель и imdb_id. Поэтому приходится
// делать запрос на каждый фильм по отдельности чтобы получить эту недостающую информацию
export async function updateListFilms(limitFilms: number, iteration: number = 1) {
    console.log("Обновлено фильмов: ", iteration*LIMIT_REQUEST)
    // DB
    const limitRowsFromDb = Math.min(limitFilms, LIMIT_REQUEST)
    const listFilmsIdsFromDb = await findIsNotUpdatedFilms(limitRowsFromDb)
    // console.log(listFilmsIdsFromDb.length)

    // API
    const limit = Math.min(listFilmsIdsFromDb.length, LIMIT_REQUEST)
    if (limit) {
        let promises = []

        for (let i = 0; i < limit; i++) {
            promises.push(fetchFilmByID(listFilmsIdsFromDb[i]))
        }

        const responses: updateFilmDto[] = []
        const start = performance.now()
        try {
            const resultsAll = await Promise.allSettled(promises)
            resultsAll.forEach((result) => {
                if (result) {
                    if (result.status == 'fulfilled') {
                        responses.push(result.value)
                    }
                    if (result.status == 'rejected') {
                        if (result.reason.response.status) {
                            console.log('Status code ', result.reason.response.status)
                            // console.log(result.reason)
                        } else {
                            console.log(result.reason)
                        }
                    }
                } else {
                    console.log('Данные по фильму не обновились')
                }
            })
        } catch {
            console.log("Ошибка с промисами")
        }

        console.log('performance, ms: ', performance.now() - start)

        const listFilms = generateListFilmsForUpdateInDb(responses)

        await saveInDb(listFilms)

        // Recursion
        if (limitFilms > LIMIT_REQUEST) {
            await updateListFilms(limitFilms - LIMIT_REQUEST, iteration+1)
        }
    }
}
