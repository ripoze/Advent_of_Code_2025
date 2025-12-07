var data = require('fs').readFileSync('day07/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split(''))


//Part 1
data_pt1 = JSON.parse(JSON.stringify(data))
let splits = 0
for (let y = 1; y < data_pt1.length; y++) {
    for (let x = 0; x < data_pt1[y].length; x++) {
        if (data_pt1[y - 1][x] == 'S') data_pt1[y][x] = '|' //Start

        if (data_pt1[y][x] == "^") { //Splitter
            if (data_pt1[y - 1][x] == "|") {
                data_pt1[y][x - 1] = "|"
                data_pt1[y][x + 1] = "|"
                splits++
            }
        }
        if (data_pt1[y][x] == ".") { //Beam going down
            if (data_pt1[y - 1][x] == "|") {
                data_pt1[y][x] = "|"
            }
        }
    }

}
console.log(`Part 1:${splits}`)


//Part 2
part2Sum = 0

for (let i = 0; i < data.length-1; i++) {
    moveBeam(data, i)
}
console.log(`Part 2:${calcRow(data[data.length-1])}`) //12472142047197



function moveBeam(data, y) {
    for (let x = 0; x < data[y].length; x++) {
        if (data[y][x] == "S") {
            data[y + 1][x] = 1
            
        }
        if (!isNaN(data[y + 1][x]) && !isNaN(data[y][x])) {
            data[y + 1][x]+=Number(data[y][x])
        }
        if (data[y + 1][x]=='.' && !isNaN(data[y][x])) {
            data[y + 1][x]=Number(data[y][x])
        }
        if (data[y + 1][x] == "^") {
            if (!isNaN(data[y + 1][x - 1])) {
                data[y + 1][x - 1]+=data[y][x]
            }
            else {
                data[y + 1][x - 1] = data[y][x]
            }
            if (!isNaN(data[y + 1][x + 1])) {
                data[y + 1][x + 1]+=data[y][x]
            }
            else {
                data[y + 1][x + 1] = data[y][x]
            }
        }
    }
}

function draw(data) {
    for (let i = 0; i < data.length; i++) {
        console.log(i, '\t\t', data[i].join('\t'))
    }
}

function calcRow(row){
    let sum=row.reduce((sum, item)=>{
        if(!isNaN(item)) sum+= Number(item)
        return sum
    },0)
    return sum
}