const md5 = require('md5');

let input = 'iwrupvqb'

let i = 1;
while (true) {
    let hashValue = md5(input + i);
    if (hashValue.startsWith('000000')) {
        console.log(i);
        break;
    }
    i++;
}
