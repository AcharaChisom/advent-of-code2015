const fs = require('fs');
const { get } = require('http');

const getInstruction = (str) => {
    let instruction = str.match(/(turn on|turn off|toggle)/g);
    return instruction[0];
};

const getValuesFromStr = (str) => {
    let values = str.match(/\d+/g);
    return values.map((val) => Number(val));
};

const turnOn = (lights, rowStart, columnStart, rowEnd, columnEnd) => {
    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = columnStart; j <= columnEnd; j++) {
            // lights[i][j] = 1;
            lights[i][j] += 1;
        }
    }
};

const turnOff = (lights, rowStart, columnStart, rowEnd, columnEnd) => {
    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = columnStart; j <= columnEnd; j++) {
            // lights[i][j] = 0;
            lights[i][j] = lights[i][j] === 0 ? 0 : lights[i][j] - 1;
        }
    }
};

const toggle = (lights, rowStart, columnStart, rowEnd, columnEnd) => {
    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = columnStart; j <= columnEnd; j++) {
            // lights[i][j] = lights[i][j] === 0 ? 1 : 0;
            lights[i][j] += 2;
        }
    }
};

fs.readFile('./instructions.txt', 'utf8', (err, data) => {
    if (err) throw err;

    let lights = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

    let instructions = data.split('\n');

    for (let i = 0; i < instructions.length; i++) {
        let [rowStart, columnStart, rowEnd, columnEnd] = getValuesFromStr(instructions[i]);
        let instruction = getInstruction(instructions[i]);

        console.log(typeof rowStart, typeof columnStart, typeof rowEnd, typeof columnEnd, typeof instruction)
        console.log(lights[rowStart][columnStart])

        switch (instruction) {
            case 'turn on':
                turnOn(lights, rowStart, columnStart, rowEnd, columnEnd);
                break;
            case 'turn off':
                turnOff(lights, rowStart, columnStart, rowEnd, columnEnd);
                break;
            case 'toggle':
                toggle(lights, rowStart, columnStart, rowEnd, columnEnd);
                break;
        }
    }

    const lightsOn = lights.reduce((acc, row) => {
        return acc + row.reduce((acc, val) => {
            return acc + val;
        }, 0);
    }, 0);

    console.log(lightsOn);
});