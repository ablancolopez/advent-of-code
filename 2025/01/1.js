const fs = require('fs')

const input = fs.readFileSync(process.argv[2], 'utf8').toString().split('\n')

let pointer = 50
let counter = 0

console.log(`The dial starts by pointing at ${pointer}.`)

input.forEach(line => {
    const direction = line[0]
    let value = parseInt(line.slice(1), 10)

    if (direction === 'L') {
        value = 100 - (value % 100) % 100
    }

    pointer = (pointer + value) % 100

    console.log(`The dial is rotated ${line} to point at ${pointer}.`)

    if (pointer === 0) {
        counter += 1
    }
})

console.log(counter)