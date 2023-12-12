const fs = require('fs');

// const containsAtLeastThreeDistinctVowels = (word) => {
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     let count = 0;

//     for (let i = 0; i < word.length; i++) {
//         if (vowels.includes(word[i])) {
//             count++;
//         }
//     }
//     return count >= 3;
// };

// const containsAtLeastOneLetterThatAppearsTwiceInARow = (word) => {
//     for (let i = 0; i < word.length - 1; i++) {
//         if (word[i] === word[i + 1]) {
//             return true;
//         }
//     }
//     return false;
// };

// const doesNotContainForbiddenStrings = (word) => {
//     const forbiddenStrings = ['ab', 'cd', 'pq', 'xy'];
//     for (let i = 0; i < forbiddenStrings.length; i++) {
//         if (word.includes(forbiddenStrings[i])) {
//             return false;
//         }
//     }
//     return true;
// };

const containsTwoLettersThatAppearTwiceWithoutOverlapping = (word) => {
    for (let i = 0; i < word.length - 2; i++) {
        const pair = word[i] + word[i + 1];
        if (word.includes(pair, i + 2)) {
            return true;
        }
    }
    return false;
};

const containsLetterThatRepeatsWithOneLetterInBetween = (word) => {
    for (let i = 0; i < word.length - 2; i++) {
        if (word[i] === word[i + 2]) {
            return true;
        }
    }
    return false;
};

fs.readFile('./words.txt', (err, data) => {
    if (err) throw err;
    const words = data.toString().split('\r\n');
    
    let count = 0;

    words.forEach((word) => {
        // if (containsAtLeastThreeDistinctVowels(word) && containsAtLeastOneLetterThatAppearsTwiceInARow(word) && doesNotContainForbiddenStrings(word)) {
        //     count++;
        // }
        if (containsTwoLettersThatAppearTwiceWithoutOverlapping(word) && containsLetterThatRepeatsWithOneLetterInBetween(word)) {
            count++;
        }
    });

    console.log(count);
});