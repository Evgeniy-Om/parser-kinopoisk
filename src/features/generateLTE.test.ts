import { generateLTE } from './generateLTE'

test('Максимальная дата должна быть последним днём месяца @unit', () => {
    expect(generateLTE(2016, 2)).toBe('2016-02-29')
    expect(generateLTE(2015, 2)).toBe('2015-02-28')
    expect(generateLTE(2000, 12)).toBe('2000-12-31')
})