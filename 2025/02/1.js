const fs = require('fs')

let sum = 0

function isInvalidId(id) {
    const str = id.toString()
    const length = str.length
    return str.substr(0, length / 2) === str.substr(length / 2)
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
