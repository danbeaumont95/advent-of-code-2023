const { readFile } = require('../helpers');

function getNumbersFromString(string) {
  const numsStr = string.replace(/[^0-9]/g, '');
  return parseInt(numsStr);
}

const getAmountOfEachColourPerGrab = (grab) => {
  const split = grab.split(', ');
  const colourObj = {}
  split.filter((el) => el).forEach((el) => {
    const amountOfColour  = getNumbersFromString(el);
    const indexOfColour = el.indexOf(amountOfColour) +2
    const colour = el.substring(indexOfColour);
    const strippedColour = colour.replace(/\s/g, '')
    colourObj[strippedColour] = null
    colourObj[strippedColour] = amountOfColour
  })
  return colourObj
}

const largesOfEachColour = (amountOfEachColourForWholeGame) => {
  const largest = { red: 0, blue: 0, green: 0 }
  amountOfEachColourForWholeGame.forEach((grab) => {
    const colourObj = getAmountOfEachColourPerGrab(grab);
    if (colourObj['red'] > largest['red']) {
      largest['red'] = colourObj['red']
    }
    if (colourObj['blue'] > largest['blue']) {
      largest['blue'] = colourObj['blue']
    }
    if (colourObj['green'] > largest['green']) {
      largest['green'] = colourObj['green']
    }
  })
  return largest;
}

const multiplyObjectValues = (largest) => {
  let num = 0
  Object.values(largest).forEach((el) => {
    if (num === 0) [
      num = el
    ]
    else {
      num = el * num
    }
  })
  return num
}

const getSum = () => {
  try {
    const arr = readFile('./data/day-2.txt')
    const sumOfFewestOfEachNumber = arr.map((el) => {
      const gameString = el.substring(0, el.indexOf(':'));
      const gameNumber = getNumbersFromString(gameString);
      const indexOfGameNumher = el.indexOf(gameNumber)
      const indexAfterNumber = indexOfGameNumher + gameNumber.toString().length + 2 // adding +2 for colon and whitespace
      const restOfString = el.substring(indexAfterNumber);
      const amountOfEachColourForWholeGame = restOfString.split('; ')
      const largest = largesOfEachColour(amountOfEachColourForWholeGame)
      const multipliedValues  = multiplyObjectValues(largest)
      return multipliedValues
    })
    const sum = sumOfFewestOfEachNumber.reduce((a,b) => a+b, 0)
    return sum // should be 69110
  } catch (err) {
    console.error(err)
  }
}

console.log(getSum(), 'sum')
