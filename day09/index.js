var data = require('fs').readFileSync('day09/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split(',').map(Number))

let areas = []
let lines = []
for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
        let area = (Math.abs(data[i][0] - data[j][0]) + 1) * (Math.abs(data[i][1] - data[j][1]) + 1)
        areas.push({ 'area': area, x1: data[i][0], y1: data[i][1], x2: data[j][0], y2: data[j][1] })
        if (data[i][0] == data[j][0]) { //horizontal line
            lines.push([...data[i], ...data[j]])
        }
        if (data[i][1] == data[j][1]) { //vertical line
            lines.push([...data[i], ...data[j]])
        }
    }
}
areas.sort((a, b) => b.area - a.area)
console.log(`Part 1:${areas[0].area}`) //4750176210


areas.map(area => {
    let minX = Math.min(area.x1, area.x2)
    let maxX = Math.max(area.x1, area.x2)
    let minY = Math.min(area.y1, area.y2)
    let maxY = Math.max(area.y1, area.y2)

    for (let i = 0; i < lines.length; i++) {
        let intersect = lineInsideRectangle([minX, minY, maxX, maxY], lines[i])
        if(intersect) area.overlapping=true
    }

})


areas = areas.filter(e => !e.overlapping)
console.log(`Part 2:${areas[0].area}`) //1574684850


function lineInsideRectangle(rect, line) {
    const [rx1, ry1, rx2, ry2] = rect;
    const [x1, y1, x2, y2] = line;

    // Normalize rectangle bounds
    const minX = Math.min(rx1, rx2);
    const maxX = Math.max(rx1, rx2);
    const minY = Math.min(ry1, ry2);
    const maxY = Math.max(ry1, ry2);

    const isHorizontal = y1 === y2;
    const isVertical   = x1 === x2;

    // --- Horizontal line ---
    if (isHorizontal) {
        // Check if the line y-level is strictly inside the rectangle
        if (y1 <= minY || y1 >= maxY) return false;  // touching or outside

        // Check horizontal overlap strictly inside X bounds
        const lMinX = Math.min(x1, x2);
        const lMaxX = Math.max(x1, x2);

        return lMaxX > minX && lMinX < maxX;
    }

    // --- Vertical line ---
    if (isVertical) {
        // Check if the line x-level is strictly inside the rectangle
        if (x1 <= minX || x1 >= maxX) return false;  // touching or outside

        // Check vertical overlap strictly inside Y bounds
        const lMinY = Math.min(y1, y2);
        const lMaxY = Math.max(y1, y2);

        return lMaxY > minY && lMinY < maxY;
    }
}
