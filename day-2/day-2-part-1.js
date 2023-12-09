const { maxRed, maxBlue, maxGreen } = require('./constants');
const { readFile } = require('../helpers');

function getNumbersFromString(string) {
  var numsStr = string.replace(/[^0-9]/g, '');
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

const isValid = (colourObj) => {
  const isRedValue = 'red' in colourObj ? colourObj['red'] <=  maxRed : true;
  const isBlueValue = 'blue' in colourObj ? colourObj['blue'] <=  maxBlue : true;
  const isGreenValue = 'green' in colourObj ? colourObj['green'] <=  maxGreen : true
  const validArray = [isRedValue, isBlueValue, isGreenValue];
  return validArray.every(elem => elem === true);
}

const getSum = () => {
  try {
    const arr = readFile('./data/day-2.txt')
    const allIds = arr.map((el) => {
      const gameString = el.substring(0, el.indexOf(':'));
      const gameNumber = getNumbersFromString(gameString);
      const indexOfGameNumher = el.indexOf(gameNumber)
      const indexAfterNumber = indexOfGameNumher + gameNumber.toString().length + 2 // adding +2 for colon and whitespace
      const restOfString = el.substring(indexAfterNumber);
      const amountOfEachColourForWholeGame = restOfString.split('; ')
      const allCorrectGameNumbers = amountOfEachColourForWholeGame.map((grab) => {
        const colourObj = getAmountOfEachColourPerGrab(grab);
        const isGrabValie = isValid(colourObj)
        if (isGrabValie) {
          return gameNumber
        }
      })
      const gameIsCorrect = allCorrectGameNumbers.every((el) => el !== undefined)
      if (gameIsCorrect) {
        return gameNumber
      }
    }).filter((el) => el)
    const sum = allIds.reduce((a,b) => a+b, 0)
    return sum // should be 2810
  } catch (err) {
    console.error(err)
  }
}

console.log(getSum(), 'sum')
