var data = require('fs').readFileSync('day04/input.txt', 'utf8')
data = data.trim().split('\n')

const maxY = data.length
const maxX = data[0].length
let rolls = []

data.map((row, x) => {
    row.split('').map((item, y) => {
        if (item == '@') rolls.push({ 'x': x, 'y': y })
    })
})

let part1 = rolls.reduce((sum, roll) => sum + (countAdjacent(roll.x, roll.y, rolls) < 4 ? 1 : 0), 0)
console.log(`Part 1:${part1}`) //1543

let rollsRemoved = 0
let removed = true
while (removed) {
    removed = false
    rolls.map(roll => {
        if (countAdjacent(roll.x, roll.y, rolls) < 4) {
            removeRoll(roll.x, roll.y, rolls)
            rollsRemoved++
            removed = true
        }
    })
}
console.log(`Part 2:${rollsRemoved}`) //9038

function countAdjacent(x, y, items) {
    let adjacent = 0
    if (items.some(e => e.x == x - 1 && e.y == y - 1)) adjacent++
    if (items.some(e => e.x == x - 1 && e.y == y)) adjacent++
    if (items.some(e => e.x == x - 1 && e.y == y + 1)) adjacent++
    if (items.some(e => e.x == x && e.y == y - 1)) adjacent++
    if (items.some(e => e.x == x && e.y == y + 1)) adjacent++
    if (items.some(e => e.x == x + 1 && e.y == y - 1)) adjacent++
    if (items.some(e => e.x == x + 1 && e.y == y)) adjacent++
    if (items.some(e => e.x == x + 1 && e.y == y + 1)) adjacent++
    return adjacent
}

function removeRoll(x, y, items) {
    let indexToRemove = items.findIndex(e => e.x == x && e.y == y)
    if (indexToRemove >= 0) items.splice(indexToRemove, 1)
    return true
}