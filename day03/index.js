var data = require('fs').readFileSync('day03/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split('').map(Number))

//Part1
let part1 = data.reduce((sum, row) => sum + findMaxJoltage(row), 0)
console.log(`Part 1:${part1}`) //17613

//Part2
let part2 = data.reduce((sum, row) => sum + findMaxJoltage_part2(row, 12), 0)
console.log(`Part 2:${part2}`) //175304218462560



function findMaxJoltage(arr) {
    let largest = Math.max(...arr.slice(0, arr.length - 1))
    let firstIndex = arr.findIndex((e) => e == largest)
    let secondLargest = Math.max(...arr.slice(firstIndex + 1))
    return largest * 10 + secondLargest
}

function findMaxJoltage_part2(arr, targetLength) {
    let startIndex = 0
    
    while (arr.length > targetLength && startIndex < targetLength) {
        let removesRemain = arr.length - targetLength
        let largest = Math.max(...arr.slice(startIndex, startIndex + removesRemain + 1))
        let a = arr.slice(startIndex, startIndex + removesRemain + 1)
        let firstIndex = a.findIndex((e) => e == largest) 
        if (firstIndex == 0) {
            startIndex++
        } else {
            arr.splice(startIndex + firstIndex - 1, 1)
            startIndex=0
        }
    }
    arr.splice(targetLength)
    return Number(arr.map(n => n.toString()).join(''))
}