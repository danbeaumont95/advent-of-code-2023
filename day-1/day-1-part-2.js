const {regex, validStrings, numLookup} = require('./constants');
const { readFile } = require('../helpers');

function getOccurancesOfSubstring(str, find) {
  return (str.split(find)).length - 1;
}
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

const addInstancesOfWordNumToLookup = (item, arrOfStrNums, iterator, lookup) => {
  iterator && iterator.forEach((str) => {
    let amountOfTimesWordAppearsInString = getOccurancesOfSubstring(item, str)
    let index = 0
    while (index < amountOfTimesWordAppearsInString) {
      if (item.indexOf(str) > -1) {
        const indexOfStr = getPosition(item, str, index +1)
        lookup.push({'indexOfStr': indexOfStr,'str': str })
        arrOfStrNums.push(indexOfStr)
    }
    index += 1
    }
  })
  return lookup
}

const getArrayOfFinalNums = (arr) => {
  const arrayOfFinalNums = []
  arr.forEach((word) => {
    const arrOfStrNums = []
    const lookup =[]
    const arrayOfNums = word.match(regex);
    addInstancesOfWordNumToLookup(word, arrOfStrNums, validStrings, lookup)
    const numArray = arrayOfNums && arrayOfNums.map((el)=> +el);
    addInstancesOfWordNumToLookup(word, arrOfStrNums, numArray, lookup)
    const arrayOfSortedIndexes = lookup?.sort((a, b) => (a.indexOfStr > b.indexOfStr ? 1 : -1))
    const firstNum = arrayOfSortedIndexes.length ? arrayOfSortedIndexes[0]['str'] : null
    const lastNum = arrayOfSortedIndexes.length ? arrayOfSortedIndexes[arrayOfSortedIndexes.length - 1]['str'] : null
    const firstAndLastTogether = firstNum !== null && firstNum !== 0 && lastNum !== null && lastNum !== 0 ? (numLookup[firstNum].toString()  + numLookup[lastNum].toString()) : null
    arrayOfFinalNums.push(+firstAndLastTogether)
  })
  return arrayOfFinalNums.filter((el) => el)
}
const getSum = () => {
  try {
    const arr = readFile('./data/day-1.txt')
    const arrayOfFinalNums = getArrayOfFinalNums(arr)
    const sum = arrayOfFinalNums.reduce((a,b) => a+b, 0)
    return sum // should be 54530
  } catch (err) {
    console.error(err)
  }
}

console.log(getSum(), 'sum')
