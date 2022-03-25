import { getConnection } from 'typeorm'

export async function findIsNotUpdatedFilms(limit: number): Promise<number[]> {
    const filmsIDs = (await getConnection().query(
        `SELECT id
               FROM film
               WHERE "is_updated" = false
               LIMIT ${limit}`
    )).map(item => item.id)

    return filmsIDs
}