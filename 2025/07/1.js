const fs = require('fs')

let matrix = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .map(line => line.split(''))

function printMatrix(matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            process.stdout.write(matrix[row][col])
        }
        process.stdout.write('\n')
    }
    process.stdout.write('\n')
}

function copyMatrix(matrix) {
    return JSON.parse(JSON.stringify(matrix))
}

printMatrix(matrix)

let counter = 0
let end = false
let nextMatrix = copyMatrix(matrix)

while (!end) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const current = matrix[row][col]
            if (current === 'S') {
                const down = matrix[row + 1][col]
                if (down === '.') {
                    nextMatrix[row + 1][col] = '|'
                }
            }

            if (current === '|') {
                if (row + 1 >= matrix.length) {
                    end = true
                    continue
                }

                const down = matrix[row + 1][col]
                const downLeft = matrix[row + 1][col - 1]
                const downRight = matrix[row + 1][col + 1]

                if (down === '.') {
                    nextMatrix[row + 1][col] = '|'
                }
                if (down === '^' && downLeft === '.' && downRight === '.') {
                    nextMatrix[row + 1][col - 1] = '|'
                    nextMatrix[row + 1][col + 1] = '|'
                    counter++
                }
            }
        }
    }

    matrix = copyMatrix(nextMatrix)
    printMatrix(matrix)
}

console.log(`A tachyon beam is split a total of ${counter} times`)