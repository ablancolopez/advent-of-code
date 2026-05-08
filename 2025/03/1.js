const fs = require('fs')

function findLargestJoltage(bank) {
    let largestFirstDigit = 0
    let largestFirstDigitPosition = -1

    for (let i = 0; i < bank.length - 1; i++) {
        const firstDigit = parseInt(bank[i], 10)
        if (firstDigit > largestFirstDigit) {
            largestFirstDigit = firstDigit
            largestFirstDigitPosition = i
        }
    }

    let largestSecondDigit = -1
    for (let i = largestFirstDigitPosition + 1; i < bank.length; i++) {
        const secondDigit = parseInt(bank[i], 10)
        if (secondDigit > largestSecondDigit) {
            largestSecondDigit = secondDigit
        }
    }

    const largestJoltage = largestFirstDigit * 10 + largestSecondDigit
    console.log(`In ${bank}, the largest joltage is ${largestJoltage}`)
    return largestJoltage
}

const totalJoltage = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString().split('\n')
    .map(bank => findLargestJoltage(bank))
    .reduce((a, b) => a + b, 0)

console.log(totalJoltage)