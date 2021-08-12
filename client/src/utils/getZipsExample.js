const {getZips} = require('./getZips');

async function f() {
    let test = await getZips(`01545`)
    console.log(test)
}

f()

