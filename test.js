//console.log(/(.+)\.\w+$/.exec('001text - 副本 (2).txt')[1]);

const filename = '02哈哈哈'
const dir = /^(\d+)([^\d]+)/.exec(filename)[1]
const name = /^(\d+)([^\d]+)/.exec(filename)[2]
console.log(typeof dir)
console.log(name)