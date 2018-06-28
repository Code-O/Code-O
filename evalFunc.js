const {exec} = require('child_process')
const args = process.argv
const myFunc = args[2]
const userValue = eval(myFunc)

// const myFunc = arr => {
//   return arr.reduce((a, b) => {
//     return a + b
//   }, 0)
// }

let funcBody = myFunc.slice(myFunc.indexOf('{'), myFunc.lastIndexOf('}') + 1)
let funcArgs = myFunc.slice(myFunc.indexOf('(') + 1, myFunc.indexOf('{') - 1)
const myFuncCall = new Function(funcArgs, funcBody)

function generateData(n) {
  let set = []
  let rando
  for (let i = 0; i < n; i++) {
    rando = Math.floor(Math.random() * 100)
    set.push(rando)
  }
  return set
}

let small = generateData(20)
let med = generateData(1000)
let large = generateData(5000)
let xl = generateData(10000)

exports.compare = {
  'small sample': function() {
    myFuncCall(small)
  },
  'med sample': function() {
    myFuncCall(med)
  },
  'large sample': function() {
    myFuncCall(large)
  },
  'xl sample': function() {
    myFuncCall(xl)
  }
}
require('bench').runMain()
console.log('mean', userValue)

// exec(`node bench.js '${myFunc.slice(0, -14)}'`, (error, stdout, stderr) => {
//   if (error) console.log(error)
//   else {
//     console.log('data sets*********#$%@%@:', stdout)
//     console.log('COMPLETE SET===============', stdout, userValue)
//   }
// })
// + `${myFunc.slice(myFunc.indexOf(' ') + 1, myFunc.indexOf('('))}()`
