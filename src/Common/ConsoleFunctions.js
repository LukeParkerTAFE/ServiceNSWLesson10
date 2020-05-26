const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question, defaultValue) {
    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
        rl.write(defaultValue)
    });
}

module.exports = {
    askQuestion
}