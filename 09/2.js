const fs = require('fs')

const points = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .map(line => line.split(',').map(Number))

function calculateArea(a, b) {
    return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1)
}

function calculateRectangle(a, b) {
    const left = Math.min(a[0], b[0])
    const right = Math.max(a[0], b[0])
    const top = Math.min(a[1], b[1])
    const bottom = Math.max(a[1], b[1])
    return {left, right, top, bottom}
}

function aabbCollision(a, b, i0, j0) {
    const rectA = calculateRectangle(a, b)
    for (let i = 0; i < points.length; i++) {
        const j = i + 1 < points.length ? i + 1 : 0

        if (i === i0 || i === j0 || j === j0 || j === i0) continue

        const rectB = calculateRectangle(points[i], points[j])

        if (rectA.left < rectB.right && rectA.right > rectB.left && rectA.top < rectB.bottom && rectA.bottom > rectB.top) {
            return true
        }
    }
    return false
}

let biggestArea = 0
for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
        if (i === j) continue

        const a = points[i]
        const b = points[j]
        if (aabbCollision(a, b, i, j)) continue

        const area = calculateArea(a, b)
        console.log(`Area between point ${i} [${a}] and point ${j} [${b}] is ${area}`)
        if (area > biggestArea) {
            biggestArea = area
        }
    }
}

console.log(`Biggest area found: ${biggestArea}`)
