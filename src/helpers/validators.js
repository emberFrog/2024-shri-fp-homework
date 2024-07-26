/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
	allPass,
	anyPass,
	toPairs,
	propEq,
	eqBy,
	equals,
	map,
	head,
	length,
	compose,
	values,
	prop,
	keys,
	pickBy,
	isNil,
	filter,
	converge,
} from 'ramda'

const shapeColorPairs = field => toPairs(field)

const pairCheck = ([shape, color]) => propEq(shape, color)

const generateChecks = field => {
	const pairs = shapeColorPairs(field)
	const checks = map(pairCheck, pairs)
	return allPass(checks)
}

const fieldN1 = {
	star: 'red',
	square: 'green',
	triangle: 'white',
	circle: 'white',
}

const fieldN4 = {
	star: 'green',
	square: 'green',
	triangle: null,
	circle: 'green',
}

const fieldN7 = {
	star: 'orange',
	square: 'orange',
	triangle: 'orange',
	circle: 'orange',
}

const fieldN9 = {
	star: 'green',
	square: 'green',
	triangle: 'green',
	circle: 'green',
}

const getColor = values
const getShape = keys

const filterNil = pickBy(value => !isNil(value))

const isGreen = equals('green')
const isRed = equals('red')
const isBlue = equals('blue')
const isOrange = equals('orange')
const isWhite = equals('white')

const isBlueCircle = compose(equals('blue'), prop('circle'))
const isRedStar = compose(equals('red'), prop('star'))
const isOrangeSquare = compose(equals('orange'), prop('square'))

const greenColors = filter(isGreen)
const redColors = filter(isRed)
const blueColors = filter(isBlue)

const twoMore = colors => colors.length >= 2
const threeMore = colors => colors.length >= 3

const equalQuantity = converge(eqBy(length), [redColors, blueColors])

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = generateChecks(fieldN1)

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(twoMore, greenColors, getColor)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(equalQuantity, getColor)

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
	isBlueCircle,
	isRedStar,
	isOrangeSquare,
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false

// 7. Все фигуры оранжевые.
export const validateFieldN7 = generateChecks(fieldN7)

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false

// 9. Все фигуры зеленые.
export const validateFieldN9 = generateChecks(fieldN9)

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false
