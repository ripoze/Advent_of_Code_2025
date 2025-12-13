var data = require('fs').readFileSync('day11/input.txt', 'utf8')
data = data.trim().split('\n').map(e => e.split(':'))
data = data.map(e => {
    e[1] = e[1].match(/\S+/g)
    return e
})


//Part 1
let paths = [['you']]

for (const start of paths) {
    let next = data.find(e => e[0] == start[start.length - 1])
    if (next) {
        for (const nextStep of next[1]) {
            paths.push([...start, nextStep])
        }
    }
}
let part1 = paths.filter(e => e[e.length - 1] == 'out').length
console.log(`Part 1:${part1}`) //543

