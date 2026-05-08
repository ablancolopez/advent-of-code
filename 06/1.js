const fs = require('fs')

const matrix = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .map(line => line.trim())
    .map(line => line.split(/\s+/))

let globalSum = 0

for (let i = 0; i < matrix[0].length; i++) {
    let currentNumbers = []
    for (let j = 0; j < matrix.length - 1; j++) {
        currentNumbers.push(Number(matrix[j][i]))
    }

    const currentSign = matrix[matrix.length - 1][i]
    const operation = currentNumbers.join(currentSign)
    const result = eval(operation)
    console.log(`${operation} = ${result}`)
    globalSum += result
}

console.log(`Total sum: ${globalSum}`)