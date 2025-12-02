var data = require('fs').readFileSync('day02/input.txt', 'utf8')
data = data.trim().split(',')
data = data.map(pair => {
    return {
        'start': pair.match(/\d+/g).map(Number)[0],
        'end': pair.match(/\d+/g).map(Number)[1]
    }
})


//Part 1
let part1 = 0
let part2 = 0
data.forEach(item => {
    for (let i = item.start; i <= item.end; i++) {
        part1 += isInvalid_part1(i) ? i : 0
        part2 += isInvalid_part2(i) ? i : 0
    }
})
console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)



function isInvalid_part1(num) {
    let str = num.toString()
    if (str.length % 2 == 1) return false //Odd always valid
    if (str.slice(0, str.length / 2) == str.slice(str.length / 2, str.length)) return true
    return false
}

function isInvalid_part2(num) {
    let str = num.toString()
    let len = str.length

    
    for (let partSize = 1; partSize <= len / 2; partSize++) {
        let testArray = []
        for (let i = 0; i < len; i += partSize) {
            testArray.push(str.slice(i, i+ partSize))
        }
        testArray=[...new Set(testArray )]
        if(testArray.length==1) return true
    }
    return false
}