// const values = process.argv
// const myFunc = values[2]
// console.log('INSIDE BENCHBBBB', myFunc)
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
    myFunc(small)
  },
  'med sample': function() {
    myFunc(med)
  },
  'large sample': function() {
    myFunc(large)
  },
  'xl sample': function() {
    myFunc(xl)
  }
}
require('bench').runMain()
