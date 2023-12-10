const fs = require('fs');

const convertToNumber = (arr) => {
    return `${arr[0]},${arr[1]}`;

}

fs.readFile('./directions.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const directions = data.toString()

    let santaPoint = [0, 0];
    let roboSantaPoint = [0, 0];
    let obj = {
        '0,0': 1
    };

    for (let i = 0; i < directions.length; i += 2) {
        let santaDirection = directions[i];
        let roboSantaDirection = directions[i + 1];

        switch (santaDirection) {
            case '^':
                santaPoint[1]++;
                break;
            case 'v':
                santaPoint[1]--;
                break;
            case '>':
                santaPoint[0]++;
                break;
            case '<':
                santaPoint[0]--;
                break;
        }

        let key = convertToNumber(santaPoint);

        if (obj[key]) {
            obj[key]++;
        } else {
            obj[key] = 1;
        }

        switch (roboSantaDirection) {
            case '^':
                roboSantaPoint[1]++;
                break;
            case 'v':
                roboSantaPoint[1]--;
                break;
            case '>':
                roboSantaPoint[0]++;
                break;
            case '<':
                roboSantaPoint[0]--;
                break;
        }

        key = convertToNumber(roboSantaPoint);

        if (obj[key]) {
            obj[key]++;
        } else {
            obj[key] = 1;
        }
    }

    console.log(obj);
    console.log(Object.keys(obj).length);

   
});