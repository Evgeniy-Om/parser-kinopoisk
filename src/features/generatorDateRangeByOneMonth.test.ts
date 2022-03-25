import { generatorDateRangeByOneMonth } from './generatorDateRangeByOneMonth'

test('Генератор диапазона дат должен выдавать массив дат с 1 числа до конца месяца @unit', function () {
    const generator = generatorDateRangeByOneMonth(2015)

    expect(generator.next().value).toEqual(['2015-01-01', '2015-01-31'])
    expect(generator.next().value).toEqual(['2015-02-01', '2015-02-28'])
})