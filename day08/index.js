var data = require('fs').readFileSync('day08/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split(',').map(Number))
data = data.map((j, index) => {
    return { 'x': j[0], 'y': j[1], 'z': j[2], 'index': index }
})

let distances = []

for (let i = 0; i < data.length-1; i++) {
    for (let j = i + 1; j < data.length; j++) {
        let distance = Math.sqrt((data[i].x - data[j].x) ** 2 + (data[i].y - data[j].y) ** 2 + (data[i].z - data[j].z) ** 2)
        distances.push({ 'index1': i, 'index2': j, 'distance': distance })
    }
}
distances = distances.sort((a, b) => a.distance - b.distance)
let connections = distances.slice(0, 1000)

let circuits = []
circuits = data.map(box=> [box.index])
connections.map(connection => {
    let con1 = data.filter(item => item.index == connection.index1)[0]
    let con2 = data.filter(item => item.index == connection.index2)[0]

    circuits.push([con1.index, con2.index])
})

//unite circuits
uniteCircuits(circuits)
circuits = circuits.sort((a, b) => b.length - a.length)
let part1 = circuits[0].length * circuits[1].length * circuits[2].length
console.log(`Part 1:${part1}`) //54180

//add connections
let newConnection
while (circuits.length > 1) {
    newConnection = distances.shift()
    circuits.push([newConnection.index1, newConnection.index2])
    uniteCircuits(circuits)
}
let part2 = data[newConnection.index1].x * data[newConnection.index2].x
console.log(`Part 2:${part2}`) //25325968




function uniteCircuits(circuits) {
    let changed = true
    while (changed) {
        changed = false
        for (let i = 0; i < circuits.length - 1; i++) {
            for (let j = i + 1; j < circuits.length; j++) {
                if ([...new Set([...circuits[i], ...circuits[j]])].length < circuits[i].length + circuits[j].length) {
                    circuits[i].push(...circuits[j])
                    circuits[i] = [...new Set(circuits[i])]
                    circuits.splice(j, 1)
                    changed = true
                    break
                }
                if (changed) break
            }
            if (changed) break
        }
    }
}