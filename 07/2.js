const fs = require('fs')

let matrix = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .map(line => line.split(''))

function printMatrix(matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            process.stdout.write(matrix[row][col].toString())
        }
        process.stdout.write('\n')
    }
    process.stdout.write('\n')
}

function copyMatrix(matrix) {
    return JSON.parse(JSON.stringify(matrix))
}

function resolvePointValue(value) {
    return value === '.' ? 0 : value
}
printMatrix(matrix)

let end = false
let nextMatrix = copyMatrix(matrix)
let valueMatrix = copyMatrix(matrix)

while (!end) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const current = matrix[row][col]
            if (current === 'S') {
                const down = matrix[row + 1][col]
                if (down === '.') {
                    nextMatrix[row + 1][col] = '|'
                }
                valueMatrix[row + 1][col] = 1
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
                }
            }

            if (current === '.' && row > 0) {
                const top = valueMatrix[row - 1][col]
                const right = valueMatrix[row][col + 1]
                const left = valueMatrix[row][col - 1]
                const topLeft = valueMatrix[row - 1][col - 1]
                const topRight = valueMatrix[row - 1][col + 1]

                let sum = 0
                if (top !== '.') {
                    sum += resolvePointValue(top)
                }
                if (right === '^') {
                    sum += resolvePointValue(topRight)
                }
                if (left === '^') {
                    sum += resolvePointValue(topLeft)
                }

                if (sum > 0) {
                    valueMatrix[row][col] = sum
                }
            }

        }
    }

    matrix = copyMatrix(nextMatrix)
    printMatrix(valueMatrix)
}

let sum = 0
for (let col = 0; col < valueMatrix[valueMatrix.length - 1].length; col++) {
    const current = valueMatrix[valueMatrix.length - 1][col]
    sum += resolvePointValue(current)
}

console.log(`The particle ends up on ${sum} different timelines`)