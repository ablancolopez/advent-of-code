const fs = require('fs')

const matrix = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .map(line => line.split(''))

let globalSum = 0

const transposed = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))

let currentNumbers = []
let currentSign = ''
for (let i = 0; i < transposed.length; i++) {
    const currentLine = transposed[i]
    const num = Number(currentLine.slice(0, -1).join(''))
    const sign = currentLine[currentLine.length - 1]

    const foundCurrentSign = sign !== ' '
    const doCalculations = num === 0 || i === transposed.length - 1

    if (num !== 0) {
        currentNumbers.push(num)
    }

    if (foundCurrentSign) {
        currentSign = sign
    }

    if (doCalculations) {
        const operation = currentNumbers.join(currentSign)
        const result = eval(operation)
        console.log(`${operation} = ${result}`)
        globalSum += result
        currentNumbers = []
    }
}

console.log(`Total sum: ${globalSum}`)