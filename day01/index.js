var data = require('fs').readFileSync('day01/input.txt', 'utf8')
data = data.trim().split('\n')
data = data.map(str => {
    let num = Number(str.match(/\d+/g)[0])
    num = str[0] == 'R' ? num : -num
    return num
})


let part1 = 0
data.reduce((num, currentNum) => {
    num += currentNum
    while (num < 0 || num > 99) {
        if (num > 99) num -= 100
        if (num < 0) num += 100
    }
    if (num == 0) part1++
    return num
}, 50)
console.log(`Part 1: ${part1}`) //1150


let part2 = 0
data.reduce((num, currentNum) => {
    while (currentNum != 0) {
        if (currentNum < 0) {
            num -= 1
            currentNum++
        }
        if (currentNum > 0) {
            num += 1
            currentNum--
        }
        if (num > 99) num -= 100
        if (num < 0) num += 100
        if (num == 0) part2++
    }
    return num
}, 50)
console.log(`Part 2: ${part2}`) //6738