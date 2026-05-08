const fs = require('fs')

let matrix = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString().split('\n').map(line => line.split(''))
let solvedMatrix = JSON.parse(JSON.stringify(matrix))

function calculateAdjacents(matrix, row, col) {
    let adjacentCount = 0
    
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ]

    directions.forEach(direction => {
        const newRow = row + direction[0]
        const newCol = col + direction[1]
        if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[row].length) {
            adjacentCount += matrix[newRow][newCol] === '@' ? 1 : 0
        }
    })
    return adjacentCount
}

function printMatrix(matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            process.stdout.write(matrix[row][col])
        }
        process.stdout.write('\n')
    }
    process.stdout.write('\n')
}

console.log('Initial state:')
printMatrix(matrix)

let currentRemovals = -1
let totalRemovals = 0
while (currentRemovals !== 0) {
    currentRemovals = 0

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const adjacentCount = calculateAdjacents(matrix, row, col)
            if (matrix[row][col] === '@' && adjacentCount < 4) {
                solvedMatrix[row][col] = 'x'
            }
        }
    }

    let count = 0
    for (let row = 0; row < solvedMatrix.length; row++) {
        for (let col = 0; col < solvedMatrix[row].length; col++) {
            if (solvedMatrix[row][col] === 'x') {
                count++
            }
        }
    }

    currentRemovals = count
    totalRemovals += count
    console.log(`Remove ${currentRemovals} rolls of paper:`)
    printMatrix(solvedMatrix)
    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            matrix[row][col] = solvedMatrix[row][col] === 'x' ? '.' : matrix[row][col]
        }
    }
    solvedMatrix = JSON.parse(JSON.stringify(matrix))
}

console.log(`A total of ${totalRemovals} rolls of paper can be removed`)