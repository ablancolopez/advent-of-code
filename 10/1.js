const fs = require('fs')

function generateCombinations(buttons) {
    const results = []

    function backtrack(startIndex, current) {
        if (current.length > 0) {
            results.push([...current])
        }
        for (let i = startIndex; i < buttons.length; i++) {
            current.push(buttons[i])
            backtrack(i + 1, current)
            current.pop()
        }
    }

    backtrack(0, [])
    return results
}

function toggleLight(light) {
    return light === '.' ? '#' : '.'
}

function checkConfiguration(indicatorLight, buttons) {
    let testIndicatorLight = indicatorLight.split('')
    for (const button of buttons) {
        const nums = button.split(',').map(Number)
        for (const num of nums) {
            testIndicatorLight[num] = toggleLight(testIndicatorLight[num])
        }
    }

    return testIndicatorLight.every(light => light === '.')
}

let sum = 0
fs.readFileSync(`${process.argv[2]}`, 'utf8').split('\n').forEach(line => {
    console.log(`Machine: ${line}`)
    const indicatorLight = line.match(/\[(.*?)\]/g)[0].slice(1, -1)
    const buttons = [...line.matchAll(/\((.*?)\)/g)].map(match => match[1])
    
    let currentMinButtons = buttons.length
    const combinations = generateCombinations(buttons)
    for (const combination of combinations) {
        if (checkConfiguration(indicatorLight, combination) && combination.length < currentMinButtons) {
            console.log(`Valid combination found: ${JSON.stringify(combination)} with ${combination.length} buttons`)
            currentMinButtons = combination.length
        }
    }
    sum += currentMinButtons
})

console.log(sum)
