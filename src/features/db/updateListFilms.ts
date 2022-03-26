import { saveInDb } from './saveInDb'
import { fetchFilmByID } from '../api/fetchFilmByID'
import { performance } from 'perf_hooks'
import { CreateFilmDto } from '../../dto/createFilm.dto'
import { generateListFilmsForCreateInDb } from '../generateListFilmsForCreateInDb'

const LIMIT_REQUEST = 6 // Всего 6 запросов может API-шка Кинопоиска одновременно обработать без пропуска

export async function updateListFilms(listFilmsIdsFromDb: number[], iteration: number = 1) {
    console.log(listFilmsIdsFromDb.length)
    // API
    const limit = Math.min(listFilmsIdsFromDb.length, LIMIT_REQUEST)
    if (limit) {
        let promises = []

        for (let i = 0; i < limit; i++) {
            promises.push(fetchFilmByID(listFilmsIdsFromDb[i]))
        }

        const responses: CreateFilmDto[] = []
        const start = performance.now()
        try {
            const resultsAll = await Promise.allSettled(promises)
            resultsAll.forEach((result) => {
                if (result.status == 'fulfilled') {
                    if (result.value) {
                        responses.push(result.value)
                    } else {
                        console.log(result)
                    }
                }
                if (result.status == 'rejected') {
                    if (result.reason.response.status) {
                        console.log('Status code ', result.reason.response.status)
                        // console.log(result.reason)
                    } else {
                        console.log(result.reason)
                    }
                }
            })
        } catch {
            console.log('Ошибка с промисами')
        }

        console.log('performance, ms: ', performance.now() - start)

        const listFilms = generateListFilmsForCreateInDb(responses)

        await saveInDb(listFilms)

        // Recursion
        setTimeout(async () => {
            const listFilmsIdsREST = listFilmsIdsFromDb.slice(6)
            if (listFilmsIdsREST.length) {
                await updateListFilms(listFilmsIdsREST, iteration + 1)
            }
        }, 0)

    }
}
