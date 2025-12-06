var data = require('fs').readFileSync('day06/input.txt', 'utf8')
data = data.split('\n').slice(0, -1)

data_part1 = data.map(str => {
    let numbers = str.match(/\S+/g).map(Number)
    if (isNaN(numbers[0])) return str.match(/\S+/g)
    return numbers
})


//Part 1
let part1Sum = 0
for (let i = 0; i < data_part1[0].length; i++) {
    let result = 0
    switch (data_part1[data_part1.length - 1][i]) {
        case '+':
            result = data_part1[0][i] + data_part1[1][i] + data_part1[2][i] + data_part1[3][i]
            break;
        case '*':
            result = data_part1[0][i] * data_part1[1][i] * data_part1[2][i] * data_part1[3][i]
            break;
    }
    part1Sum += result
}
console.log(`Part 1:${part1Sum}`) //5877594983578

//Part 2

let arr = []
let tempArr = []
for (let i = 0; i < data[0].length; i++) {
    let num = Number(data[0][i] + data[1][i] + data[2][i] + data[3][i])
    if (num > 0) {
        tempArr.push(num)
    }
    else {
        arr.push(tempArr)
        tempArr = []
    }
}
arr.push(tempArr)

let operations = data[4].match(/\S+/g)

let part2Sum = 0
for (let i = 0; i < arr.length; i++) {
    let result = 0
    switch (operations[i]) {
        case '+':
            result = arr[i].reduce((sum, item) => sum + item, 0)
            break;
        case '*':
            result = arr[i].reduce((sum, item) => sum * item, 1)
            break;
    }
    part2Sum += result
}
console.log(`Part 2:${part2Sum}`) //11159825706149