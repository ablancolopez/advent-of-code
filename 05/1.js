const fs = require('fs')

let freshIngredientRanges = []
let freshIngredients = 0

fs.readFileSync(`${process.argv[2]}`, 'utf8').toString().split('\n').forEach(line => {
    if (line.includes('-')) {
        freshIngredientRanges.push(line.trim())
    } else if (line.trim() !== '') {
        const availableIngredient = parseInt(line.trim(), 10)
        let isSpoiled = true
        for (let range of freshIngredientRanges) {
            const [min, max] = range.split('-').map(num => parseInt(num, 10))
            if (availableIngredient >= min && availableIngredient <= max) {
                isSpoiled = false
                console.log(`Ingredient ${availableIngredient} is fresh because it falls into range ${min}-${max}.`)
                freshIngredients++
                break
            }
        }
        if (isSpoiled) {
            console.log(`Ingredient ${availableIngredient} is spoiled.`)
        }
    }
})

console.log(`Total fresh ingredients: ${freshIngredients}`)
