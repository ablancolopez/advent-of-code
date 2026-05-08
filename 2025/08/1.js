const fs = require('fs')

const boxes = fs.readFileSync(`${process.argv[2]}`, 'utf8').toString()
    .split('\n')
    .map(line => line.split(','))

const interations = process.argv[3] || 10

function euclideanDistance(a, b) {
    return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0))
}

function includesPair(pairs, pair) {
    for (const p of pairs) {
        if ((p[0] === pair[0] && p[1] === pair[1])) {
            return true
        }
    }
    return false
}

function buildGraph(pairs) {
    const graph = new Map()
    for (const [a, b] of pairs) {
        if (!graph.has(a)) graph.set(a, [])
        if (!graph.has(b)) graph.set(b, [])
        graph.get(a).push(b)
        graph.get(b).push(a)
    }
    return graph
}

function groupConnections(graph) {
    const visited = new Set()
    const groups = []

    const dfs = (node, group) => {
        if (visited.has(node)) return
        visited.add(node)
        group.push(node)
        for (const neighbor of graph.get(node) || []) {
            dfs(neighbor, group)
        }
    }

    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            const group = []
            dfs(node, group)
            groups.push(group)
        }
    }
    return groups
}

function calculateConnections(boxes, iterations) {
    let connectedBoxes = []
    for (let iter = 0; iter < interations; iter++) {
        let shortestDistance = Infinity
        let pair = null
        for (let i = 0; i < boxes.length; i++) {
            for (let j = 0; j < boxes.length - 1; j++) {
                if (i === j) continue
                const dist = euclideanDistance(boxes[i], boxes[j])
                const currentPair = [i, j].sort()
                if (dist < shortestDistance && !includesPair(connectedBoxes, currentPair)) {
                    shortestDistance = dist
                    pair = currentPair
                }
            }
        }
        connectedBoxes.push(pair)
        console.log(`Iteration ${iter + 1}: Shortest distance is ${shortestDistance} between boxes ${pair[0]} [${boxes[pair[0]]}] and ${pair[1]} [${boxes[pair[1]]}]`)

    }

    return connectedBoxes
}

const connectedBoxes = calculateConnections(boxes, interations)
const graph = buildGraph(connectedBoxes)
const groups = groupConnections(graph)
const sortedGroups = groups.sort((a, b) => b.length - a.length)

let sum = 1
const circuits = 3
for (let i = 0; i < circuits; i++) {
    sum *= sortedGroups[i] ? sortedGroups[i].length : 1
}

console.log(`\nTotal boxes in the first ${circuits} largest circuits: ${sum}`)
