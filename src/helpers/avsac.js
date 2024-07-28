import {
	__,
	allPass,
	complement,
	countBy,
	equals,
	gte,
	identity,
	pipe,
	prop,
	propEq,
	values,
} from 'ramda'

const getGreen = prop('green')
const getRed = prop('red')

const isGreaterThenTwo = gte(__, 2)
const isEqualsOne = equals(__, 1)

const isRedStar = propEq('star', 'red')
const isWhiteTriangle = propEq('triangle', 'white')
const isGreenTriangle = propEq('triangle', 'green')
const isWhiteStar = propEq('star', 'white')
const isWhiteSquare = propEq('suare', 'white')
const isNotRedStar = complement(isRedStar)
const isNotWhiteStar = complement(isWhiteStar)
const isNotWhiteSquare = complement(isWhiteSquare)
const isNotWhiteTriangle = complement(isWhiteTriangle)

const colorsCount = pipe(values, countBy(identity))
const countOfGreen = pipe(colorsCount, getGreen)
const countOfRed = pipe(colorsCount, getRed)

const isGreenEqualsTwo = pipe(countOfGreen, isGreaterThenTwo)
const isRedEqualsOne = pipe(countOfRed, isEqualsOne)

const isTriangleEqualsSquare = ({ triangle, square }) => triangle === square

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
	isGreenTriangle,
	isGreenEqualsTwo,
	isRedEqualsOne,
])

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar])

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
	isTriangleEqualsSquare,
	isNotWhiteTriangle,
	isNotWhiteSquare,
])
