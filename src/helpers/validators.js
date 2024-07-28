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
	__,
	gte,
	allPass,
	any,
	toPairs,
	propEq,
	eqBy,
	equals,
	map,
	length,
	compose,
	values,
	prop,
	filter,
	dissoc,
	converge,
	identity,
	countBy,
	complement,
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
const getGreen = prop('green')
const getRed = prop('red')

const isGreen = equals('green')
const isRed = equals('red')
const isBlue = equals('blue')

const isBlueCircle = propEq('circle', 'blue')
const isRedStar = propEq('star', 'red')
const isOrangeSquare = propEq('square', 'orange')
const isGreenTriangle = propEq('triangle', 'green')
const isWhiteTriangle = propEq('triangle', 'white')
const isWhiteStar = propEq('star', 'white')
const isWhiteSquare = propEq('square', 'white')
const isNotRedStar = complement(isRedStar)
const isNotWhiteStar = complement(isWhiteStar)
const isNotWhiteSquare = complement(isWhiteSquare)
const isNotWhiteTriangle = complement(isWhiteTriangle)

const greenColors = filter(isGreen)
const redColors = filter(isRed)
const blueColors = filter(isBlue)

const twoMore = colors => colors.length >= 2
const isTriangleEqualsSquare = ({ triangle, square }) => triangle === square

const colorsCount = compose(countBy(identity), getColor)
const excludeWhite = dissoc('white')
const colorsCountExcludeWhite = compose(excludeWhite, colorsCount)

const isEqualsOne = equals(__, 1)
const isGreaterThenTwo = gte(__, 2)
const isGreaterThenThree = gte(__, 3)

const countOfGreen = compose(getGreen, colorsCount)
const countOfRed = compose(getRed, colorsCount)

const anyGreaterThenThree = compose(any(isGreaterThenThree), getColor)
const isGreenEqualsTwo = compose(isGreaterThenTwo, countOfGreen)
const isRedEqualsOne = compose(isEqualsOne, countOfRed)

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
export const validateFieldN5 = compose(
	anyGreaterThenThree,
	colorsCountExcludeWhite
)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
	isGreenTriangle,
	isGreenEqualsTwo,
	isRedEqualsOne,
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = generateChecks(fieldN7)

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar])

// 9. Все фигуры зеленые.
export const validateFieldN9 = generateChecks(fieldN9)

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
	isTriangleEqualsSquare,
	isNotWhiteTriangle,
	isNotWhiteSquare,
])
