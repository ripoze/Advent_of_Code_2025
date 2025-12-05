var data = require('fs').readFileSync('day05/input.txt', 'utf8')
data = data.trim().split('\n\n')

let freshRanges = data[0].split('\n').map(row => {
    let res = {
        "start": row.match(/\d+/g).map(Number)[0],
        "end": row.match(/\d+/g).map(Number)[1]
    }
    return res
})


let available = data[1].split('\n').map(Number)

let part1 = available.reduce((sum, item) => sum + (isFresh(item, freshRanges) ? 1 : 0), 0)
console.log(`Part 1:${part1}`)//789

let removed = true
while (removed == true) {
    removed = false
    for (let i = 0; i < freshRanges.length; i++) {
        for (let j = 0; j < freshRanges.length; j++) {
            if (i != j && isOverlapping(freshRanges[i], freshRanges[j])) {
                const s1 = freshRanges[i].start
                const s2=freshRanges[j].start
                const e1 = freshRanges[i].end
                const e2 = freshRanges[j].end
                
                let newRange = {
                    start: Math.min(s1, s2),
                    end: Math.max(e1, e2),
                }
                freshRanges.splice(freshRanges.findIndex(e=> e.start == s1 && e.end == e1), 1)
                freshRanges.splice(freshRanges.findIndex(e=> e.start == s2 && e.end == e2), 1)
                freshRanges.push(newRange)
                removed = true
                break
            }
        }
    }
}
let sum=0
freshRanges.map(r=>{
    sum += r.end - r.start +1
})
console.log(`Part 2:${sum}`) //343329651880509 



function isFresh(i, ranges) {
    let res = false
    ranges.map(r => {
        if (i >= r.start && i <= r.end) res = true
    })
    return res
}

function isOverlapping(r1, r2) {
    if (r1.start <= r2.start) {
        if (r2.start <= r1.end) return true
    }
    if (r2.start <= r1.start) {
        if (r1.start <= r2.end) return true
    }
    return false
}