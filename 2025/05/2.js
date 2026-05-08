const fs = require('fs')

let freshIngredients = 0

const freshIngredientRanges = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .filter(line => line.includes('-'))
    .map(line => line.split('-').map(num => parseInt(num, 10)))
    .sort((a, b) => {
        return a[0] - b[0] || a[1] - b[1]
    })

let mergedRanges = []

let i = 0
while (i < freshIngredientRanges.length) {
    const currentRange = freshIngredientRanges[i]

    let j = i + 1
    while (j < freshIngredientRanges.length) {
        const nextRange = freshIngredientRanges[j]
        if (currentRange[1] >= nextRange[0]) {
            currentRange[0] = Math.min(currentRange[0], nextRange[0])
            currentRange[1] = Math.max(currentRange[1], nextRange[1])
            j++
        } else {
            break
        }
    }
    mergedRanges.push(currentRange)
    i = j
}

mergedRanges.forEach(range => {
    freshIngredients += range[1] - range[0] + 1
})

console.log(`Total fresh ingredients: ${freshIngredients}`)
