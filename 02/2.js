const fs = require('fs')

let sum = 0

function isInvalidId(id) {
    const str = id.toString()
    const length = str.length

    for (let i = 1; i <= length; i++) {
        let splits = []

        for (let j = 0; j < length; j += i) {
            splits.push(str.substring(j, j + i)) 
        }

        if (splits.length > 1 && splits.every(value => value === splits[0])) {
            return true
        }
    }
    return false
}

fs.readFileSync(`${process.argv[2]}`, 'utf8').toString().split(',').forEach(range => {
    const firstId = parseInt(range.split('-')[0], 10)
    const lastId = parseInt(range.split('-')[1], 10)
    let invalidIds = []
    for (let i = firstId; i <= lastId; i++) {
        if (isInvalidId(i)) {
            invalidIds.push(i)
        }
    }

    console.log(`${firstId}-${lastId} has ${invalidIds.length} invalid IDs: ${invalidIds.join(', ')}`)
    sum += invalidIds.reduce((a, b) => a + b, 0)
})



console.log(sum)
