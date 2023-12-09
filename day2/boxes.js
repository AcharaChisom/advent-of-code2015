const fs = require('fs');

const getMinimumTwoNumbers = (numbers) => {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    return [numbers[0], numbers[1]];
};

fs.readFile('./boxes.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const boxes = data.split('\n');
    // let totalFeet = 0;
    let totalRibbon = 0;

    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i].split('x').map(Number);

        const [min1, min2] = getMinimumTwoNumbers(box);
        // const surfaceArea = 2 * (box[0] * box[1] + box[0] * box[2] + box[1] * box[2]);
        // totalFeet += surfaceArea + min1 * min2;

        const ribbon = 2 * (min1 + min2) + box[0] * box[1] * box[2];
        totalRibbon += ribbon;
    }

    // console.log(totalFeet);
    console.log(totalRibbon);
});