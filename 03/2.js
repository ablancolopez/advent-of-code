const fs = require('fs')

function findLargestJoltage(bank) {
    let largestDigits = ''
    let largestDigitsPosition = []

    const digitCount = 12
    for (let n = 0; n < digitCount; n++) {
        let currentLargestDigit = 0
        let currentLargestDigitPosition = -1
        const startingPosition = largestDigitsPosition.length > 0 ? largestDigitsPosition[largestDigitsPosition.length - 1] + 1 : 0

        for (let i = startingPosition; i <= bank.length - digitCount + n; i++) {
            const digit = parseInt(bank[i], 10)
            if (digit > currentLargestDigit) {
                currentLargestDigit = digit
                currentLargestDigitPosition = i
            }
        }
        largestDigits += currentLargestDigit.toString()
        largestDigitsPosition.push(currentLargestDigitPosition)
    }

    const largestJoltage = parseInt(largestDigits, 10)
    console.log(`In ${bank}, the largest joltage is ${largestJoltage}`)
    return largestJoltage
}

const totalJoltage = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString().split('\n')
    .map(bank => findLargestJoltage(bank))
    .reduce((a, b) => a + b, 0)

console.log(totalJoltage)