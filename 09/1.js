const fs = require('fs')

const points = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .map(line => line.split(',').map(Number))

function calculateArea(a, b) {
    return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1)
}

let biggestArea = 0
for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
        if (i === j) continue
        const area = calculateArea(points[i], points[j])
        console.log(`Area between point ${i} [${points[i]}] and point ${j} [${points[j]}] is ${area}`)
        if (area > biggestArea) {
            biggestArea = area
        }
    }
}

console.log(`Biggest area found: ${biggestArea}`)
