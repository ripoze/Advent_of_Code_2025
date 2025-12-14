var data = require('fs').readFileSync('day12/input.txt', 'utf8')
data = data.trim().split('\n\n')

let shapes = data.slice(0, 6).map(e => e.split(':\n')[1].split('\n'))
let regions = data[6].split('\n').map(e => e.match(/\d+/g).map(Number))

let part1 = regions.reduce((sum, e) => {
    let area = e[0] * e[1]
    let items = e.slice(2).reduce((acc, n) => acc + n * 3 * 3, 0)
    sum += area >= items ? 1 : 0
    return sum
}, 0)
console.log(`Part 1:${part1}`)