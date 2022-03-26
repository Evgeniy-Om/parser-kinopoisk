import { getConnection } from 'typeorm'

export async function findIsNotProcessedFilms(limit: number): Promise<number[]> {
    try {
        const filmsIDs = (await getConnection().query(
            `SELECT id
               FROM filmids
               EXCEPT SELECT id
               FROM film
               LIMIT ${limit}`
        )).map(item => item.id)

        return filmsIDs
    } catch (e) {
        console.log("Не удаётся получить список ID-шников фильмов, которые ещё не обработаны", e)
    }
}