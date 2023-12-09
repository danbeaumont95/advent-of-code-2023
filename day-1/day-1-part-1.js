const { readFile } = require('../helpers');

const getFirstAndLastNumberInString = (arrayOfNums) => {
  const first = arrayOfNums !== null ? arrayOfNums[0] : null
  const last = arrayOfNums !== null ? arrayOfNums[arrayOfNums.length-1] : null
  return {first, last}
}

const getSum = () => {
  try {
    const arr = readFile('./data/day-1.txt')
    const regex = /[0-9]/g
    const allNums = arr.map((el) => {
      const arrayOfNums = el.match(regex);
      const { first, last } = getFirstAndLastNumberInString(arrayOfNums)
      return +(first + last)
    })
    const sum = allNums.reduce((a,b) => a+b, 0)
    return sum // should be 56049
  } catch (err) {
    console.error(err)
  }
}

console.log(getSum(), 'sum')

