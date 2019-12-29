const { once } = require('events')

const fromReadableStream = (stream, byBytes) => (start, sink) => {
  if (start !== 0) return

  const handler = value => {
    if (byBytes !== undefined) {
      for (let i = 0; i < value.length; i++)
        sink(1, value[i])
    }
    else
      sink(1, value)
  }

  sink(0, t => {
    if (t === 2) stream.off('data', handler)
  })

  stream.on('data', handler)
  once(stream, 'end').then(() => sink(2))
}

module.exports = fromReadableStream
