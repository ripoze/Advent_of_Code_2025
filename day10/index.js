var data = require('fs').readFileSync('day10/input.txt', 'utf8')
data = data.trim().split('\n')


let d = data.map(row => {
    let lightRow = row.match(/\[(\S+)\]/g)[0].slice(1, -1).split('').reduce((sum, light, index) => sum += light == '#' ? 2 ** index : 0, 0)

    let buttons = row.match(/\(\S+\)/g).map(e => e.slice(1, -1))
    buttons = buttons.map(button => button.match(/\d/g).map(b => 2 ** b).reduce((sum, b) => sum + b, 0))

    let joltage = row.match(/\{\S+\}/g)[0].slice(1, -1).split(',').map(Number)

    return { 'correctLights': lightRow, 'buttons': buttons, 'joltage': joltage }
})


let part1 = d.reduce((sum, machine) => sum + minXorSteps(machine.buttons, machine.correctLights), 0)
console.log(`Part 1:${part1}`) //558



function minXorSteps(nums, target) {
    const queue = [{ value: 0, steps: 0 }];
    const visited = new Set([0]);

    while (queue.length > 0) {
        const { value, steps } = queue.shift();

        if (value === target) return steps;

        for (const n of nums) {
            const next = value ^ n;

            if (!visited.has(next)) {
                visited.add(next);
                queue.push({ value: next, steps: steps + 1 });
            }
        }
    }
}

