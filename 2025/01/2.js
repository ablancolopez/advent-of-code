const fs = require('fs')

const input = fs.readFileSync(process.argv[2], 'utf8').toString().split('\n')

let pointer = 50
let counter = 0

console.log(`The dial starts by pointing at ${pointer}.`)

input.forEach(line => {
    const direction = line[0] === 'L' ? -1 : 1
    let value = parseInt(line.slice(1), 10)
    let localCounter = 0

    while (value > 0) {
        if (pointer === 0 && direction === -1) {
            pointer = 100
        }

        if (pointer === 99 && direction === 1) {
            pointer = -1
        }

        pointer += direction

        value--

       if (pointer === 0) {
            localCounter += 1
        }
    }

    console.log(`The dial is rotated ${line} to point at ${pointer}; during this rotation, it points at zero ${localCounter} times`)

    counter += localCounter
})

console.log(counter)