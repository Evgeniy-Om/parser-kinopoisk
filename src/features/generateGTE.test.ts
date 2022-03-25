import { generateGTE } from './generateGTE'

test('Минимальная дата должна быть первым днём месяца @unit', () => {
    expect(generateGTE(2016, 2)).toBe('2016-02-01')
    expect(generateGTE(2000, 12)).toBe('2000-12-01')
    expect(generateGTE(2025, 12)).toBe('2025-12-01')
})