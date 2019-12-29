const { pipe, map, forEach } = require('callbag-basics')
const fromReadableStream = require('.')

pipe(
  fromReadableStream(process.stdin),
  map(e => e.toString()),
  forEach(console.log)
)

// Pass in `true` as the second param to get a stream of bytes:
pipe(
  fromReadableStream(process.stdin, true),
  map(String.fromCharCode),
  forEach(console.log)
)
